import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { siteUrl } from '@/lib/site'
import { POST } from './route'

const endpoint = 'http://localhost:3000/api/indexnow'
const token = 'test-indexnow-token'

function request(body: BodyInit, authorization = `Bearer ${token}`) {
  return new Request(endpoint, {
    method: 'POST',
    headers: {
      authorization,
      'content-type': 'application/json',
    },
    body,
  })
}

describe('POST /api/indexnow', () => {
  beforeEach(() => {
    process.env.INDEXNOW_SUBMIT_TOKEN = token
    vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 202 })))
  })

  afterEach(() => {
    delete process.env.INDEXNOW_SUBMIT_TOKEN
    vi.unstubAllGlobals()
  })

  it('fails closed when the server token is not configured', async () => {
    delete process.env.INDEXNOW_SUBMIT_TOKEN
    const response = await POST(request('{}'))

    expect(response.status).toBe(503)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('rejects unauthenticated requests before parsing their body', async () => {
    const response = await POST(request('{', 'Bearer wrong-token'))

    expect(response.status).toBe(401)
    expect(response.headers.get('www-authenticate')).toContain('Bearer')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('returns 400 for malformed JSON', async () => {
    const response = await POST(request('{'))

    expect(response.status).toBe(400)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('rejects URLs outside the canonical site origin', async () => {
    const response = await POST(request(JSON.stringify({ urls: ['https://example.com/'] })))

    expect(response.status).toBe(403)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('caps each request at 100 URLs', async () => {
    const urls = Array.from({ length: 101 }, (_, index) => `${siteUrl}/page-${index}`)
    const response = await POST(request(JSON.stringify({ urls })))

    expect(response.status).toBe(413)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('deduplicates same-origin URLs and strips fragments', async () => {
    const response = await POST(request(JSON.stringify({
      urls: [`${siteUrl}/work#first`, `${siteUrl}/work#second`],
    })))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ submitted: 1 })
    expect(fetch).toHaveBeenCalledOnce()

    const init = vi.mocked(fetch).mock.calls[0]?.[1]
    const payload = JSON.parse(String(init?.body))
    expect(payload.urlList).toEqual([`${siteUrl}/work`])
  })

  it('maps upstream failures to a controlled 502 response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 429 }))
    const response = await POST(request('{}'))

    expect(response.status).toBe(502)
    expect(await response.json()).toEqual({
      error: 'IndexNow rejected the submission',
      upstreamStatus: 429,
    })
  })
})
