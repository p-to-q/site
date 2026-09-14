'use client'

import { useState } from 'react'
import type { KeyboardEvent } from 'react'

export function DynamiclandPhotoToggle() {
  const [pressed, setPressed] = useState(false)

  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, nextPressed: boolean) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    setPressed(nextPressed)
  }

  return (
    <button
      type="button"
      className="writing-margin-photo-toggle"
      data-pressed={pressed ? 'true' : undefined}
      aria-pressed={pressed}
      aria-label="Hold to compare the Dynamicland room with its physical setup"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onKeyDown={(event) => handleKey(event, true)}
      onKeyUp={(event) => handleKey(event, false)}
      onBlur={() => setPressed(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dynamicland-illustration.png"
        alt="Illustration of Dynamicland's communal science lab - people working together in a room where computation is embedded in physical space"
        className="writing-margin-photo writing-margin-photo-toggle__default"
        draggable={false}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dynamicland-map.png"
        alt=""
        className="writing-margin-photo writing-margin-photo-toggle__pressed"
        draggable={false}
      />
    </button>
  )
}
