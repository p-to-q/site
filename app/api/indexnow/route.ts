import { timingSafeEqual } from 'node:crypto'
import { siteUrl } from '@/lib/site'

const INDEXNOW_KEY = '565d375ed0c2ecbf770bba85ee337d57'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const MAX_URLS_PER_REQUEST = 100
const UPSTREAM_TIMEOUT_MS = 8_000

const DEFAULT_URLS = [
  `${siteUrl}/`,
  `${siteUrl}/work`,
  `${siteUrl}/writing`,
  `${siteUrl}/writing/strange-tools`,
  `${siteUrl}/writing/the-forest-and-the-interface`,
]

const responseHeaders = {
  'Cache-Control': 'private, no-store',
}

function json(data: Record<string, unknown>, status: number, headers?: HeadersInit) {
  return Response.json(data, {
    status,
    headers: { ...responseHeaders, ...headers },
  })
}

function hasValidBearerToken(request: Request, expectedToken: string): boolean {
  const authorization = request.headers.get('authorization')
  if (!authorization?.startsWith('Bearer ')) return false

  const supplied = Buffer.from(authorization.slice('Bearer '.length))
  const expected = Buffer.from(expectedToken)
  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}

function normalizeUrls(input: unknown): { urls?: string[]; error?: Response } {
  if (input !== undefined && !Array.isArray(input)) {
    return { error: json({ error: 'urls must be an array' }, 400) }
  }

  const candidates = (input as unknown[] | undefined) ?? []
  if (candidates.length > MAX_URLS_PER_REQUEST) {
    return { error: json({ error: `at most ${MAX_URLS_PER_REQUEST} URLs are allowed` }, 413) }
  }

  if (candidates.some((candidate) => typeof candidate !== 'string')) {
    return { error: json({ error: 'every URL must be a string' }, 400) }
  }

  const allowedOrigin = new URL(siteUrl).origin
  const normalized = new Set<string>()

  for (const candidate of candidates as string[]) {
    let url: URL
    try {
      url = new URL(candidate, `${allowedOrigin}/`)
    } catch {
      return { error: json({ error: 'invalid URL' }, 400) }
    }

    if (url.origin !== allowedOrigin) {
      return { error: json({ error: 'only same-origin URLs may be submitted' }, 403) }
    }

    url.hash = ''
    normalized.add(url.href)
  }

  return { urls: normalized.size > 0 ? [...normalized] : DEFAULT_URLS }
}

export async function POST(request: Request) {
  const expectedToken = process.env.INDEXNOW_SUBMIT_TOKEN?.trim()
  if (!expectedToken) {
    return json({ error: 'IndexNow submission is not configured' }, 503)
  }

  if (!hasValidBearerToken(request, expectedToken)) {
    return json(
      { error: 'Unauthorized' },
      401,
      { 'WWW-Authenticate': 'Bearer realm="IndexNow"' }
    )
  }

  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return json({ error: 'Content-Type must be application/json' }, 415)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Malformed JSON' }, 400)
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'JSON body must be an object' }, 400)
  }

  const { urls, error } = normalizeUrls((body as { urls?: unknown }).urls)
  if (error || !urls) return error ?? json({ error: 'Invalid URLs' }, 400)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: new URL(siteUrl).host,
        key: INDEXNOW_KEY,
        keyLocation: `${siteUrl}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
      signal: controller.signal,
    })

    if (!res.ok) {
      return json({ error: 'IndexNow rejected the submission', upstreamStatus: res.status }, 502)
    }

    return json({ submitted: urls.length }, 200)
  } catch (cause) {
    const timedOut = cause instanceof Error && cause.name === 'AbortError'
    return json({ error: timedOut ? 'IndexNow timed out' : 'IndexNow is unavailable' }, 502)
  } finally {
    clearTimeout(timeout)
  }
}
