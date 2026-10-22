import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { readImageSize } from '@/lib/image-size'

const work = (file: string) => readFileSync(join(process.cwd(), 'public', 'work', file))

describe('readImageSize', () => {
  // Expected values cross-checked against sharp metadata.
  it.each([
    ['flatus.png', 1612, 1532],
    ['sonde.gif', 640, 384],
    ['matter-demo-poster.jpg', 1280, 720],
    ['wittgenstein.jpeg', 5963, 2159],
    ['ants.svg', 1200, 380], // width + viewBox only
    ['see-me-see-u-poster.svg', 851, 132],
  ])('%s → %ix%i', (file, width, height) => {
    expect(readImageSize(work(file), file.slice(file.lastIndexOf('.')))).toEqual({ width, height })
  })

  it('swaps JPEG dimensions for EXIF orientations 5–8', () => {
    // SOI, APP1 Exif (big-endian TIFF, one IFD entry: Orientation = 6), SOF0 2x1, EOI.
    const tiff = Buffer.from([
      0x4d, 0x4d, 0x00, 0x2a, 0x00, 0x00, 0x00, 0x08,
      0x00, 0x01, 0x01, 0x12, 0x00, 0x03, 0x00, 0x00, 0x00, 0x01, 0x00, 0x06, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
    ])
    const app1 = Buffer.concat([Buffer.from('Exif\0\0', 'ascii'), tiff])
    const jpeg = Buffer.concat([
      Buffer.from([0xff, 0xd8, 0xff, 0xe1]),
      Buffer.from([(app1.length + 2) >> 8, (app1.length + 2) & 0xff]),
      app1,
      Buffer.from([0xff, 0xc0, 0x00, 0x0b, 0x08, 0x00, 0x01, 0x00, 0x02, 0x01, 0x01, 0x11, 0x00]),
      Buffer.from([0xff, 0xd9]),
    ])
    expect(readImageSize(jpeg, '.jpg')).toEqual({ width: 1, height: 2 })
  })

  it('returns null for unreadable input', () => {
    expect(readImageSize(Buffer.from('not an image'), '.png')).toBeNull()
    expect(readImageSize(Buffer.from('<svg width="100%"></svg>'), '.svg')).toBeNull()
    expect(readImageSize(Buffer.alloc(0), '.mp4')).toBeNull()
  })
})
