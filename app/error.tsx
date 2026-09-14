'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section role="alert" className="flex min-h-[45vh] flex-col justify-center gap-3">
      <h1 className="heading-text home-page-heading home-page-tagline">non sequitur.</h1>
      <p className="body-text">Something did not follow.</p>
      <button type="button" className="error-retry body-text self-start" onClick={reset}>
        retry the arrow
      </button>
    </section>
  )
}
