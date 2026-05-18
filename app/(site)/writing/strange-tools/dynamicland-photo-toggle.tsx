'use client'

import { useState } from 'react'

export function DynamiclandPhotoToggle() {
  const [pressed, setPressed] = useState(false)

  return (
    <span
      className="writing-margin-photo-toggle"
      data-pressed={pressed ? 'true' : undefined}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
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
    </span>
  )
}
