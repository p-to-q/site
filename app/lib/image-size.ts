/**
 * Minimal, dependency-free intrinsic-size reader for the image formats the
 * Work previews use. Only headers are parsed, so it is cheap enough to run on
 * every build. Returns the size the browser will *display* (JPEG EXIF
 * orientation 5–8 swaps width and height), or null for anything unreadable.
 */
export type ImageSize = { width: number; height: number }

export function readImageSize(buffer: Buffer, ext: string): ImageSize | null {
  switch (ext.toLowerCase()) {
    case '.png':
      return readPng(buffer)
    case '.gif':
      return readGif(buffer)
    case '.jpg':
    case '.jpeg':
      return readJpeg(buffer)
    case '.webp':
      return readWebp(buffer)
    case '.svg':
      return readSvg(buffer.toString('utf8'))
    default:
      return null
  }
}

const valid = (width: number, height: number): ImageSize | null =>
  Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0
    ? { width, height }
    : null

function readPng(b: Buffer) {
  if (b.length < 24 || b.toString('ascii', 1, 4) !== 'PNG') return null
  return valid(b.readUInt32BE(16), b.readUInt32BE(20))
}

function readGif(b: Buffer) {
  if (b.length < 10 || b.toString('ascii', 0, 3) !== 'GIF') return null
  return valid(b.readUInt16LE(6), b.readUInt16LE(8))
}

function readWebp(b: Buffer) {
  if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') {
    return null
  }
  const chunk = b.toString('ascii', 12, 16)
  if (chunk === 'VP8X') return valid(1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3))
  if (chunk === 'VP8 ') return valid(b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff)
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21)
    return valid((bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1)
  }
  return null
}

function readJpeg(b: Buffer) {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null
  let orientation = 1
  let offset = 2
  while (offset + 4 <= b.length) {
    if (b[offset] !== 0xff) return null
    const marker = b[offset + 1]
    if (marker === 0xff) {
      offset += 1 // fill byte
      continue
    }
    const length = b.readUInt16BE(offset + 2)
    if (marker === 0xe1 && b.toString('ascii', offset + 4, offset + 8) === 'Exif') {
      orientation = readExifOrientation(b, offset + 10) ?? orientation
    }
    // SOF0–SOF15 carry the frame size, except DHT (C4), JPG (C8) and DAC (CC).
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const height = b.readUInt16BE(offset + 5)
      const width = b.readUInt16BE(offset + 7)
      return orientation >= 5 ? valid(height, width) : valid(width, height)
    }
    offset += 2 + length
  }
  return null
}

function readExifOrientation(b: Buffer, tiff: number): number | null {
  if (tiff + 8 > b.length) return null
  const little = b.toString('ascii', tiff, tiff + 2) === 'II'
  const u16 = (at: number) => (little ? b.readUInt16LE(at) : b.readUInt16BE(at))
  const u32 = (at: number) => (little ? b.readUInt32LE(at) : b.readUInt32BE(at))
  const ifd = tiff + u32(tiff + 4)
  if (ifd + 2 > b.length) return null
  const count = u16(ifd)
  for (let i = 0; i < count; i++) {
    const entry = ifd + 2 + i * 12
    if (entry + 12 > b.length) return null
    if (u16(entry) === 0x0112) return u16(entry + 8)
  }
  return null
}

function readSvg(text: string) {
  const root = /<svg\b[^>]*>/i.exec(text)?.[0]
  if (!root) return null
  const attr = (name: string) => new RegExp(`\\s${name}\\s*=\\s*["']([^"']*)["']`, 'i').exec(root)?.[1]
  // Absolute lengths only; percentages give no intrinsic size.
  const length = (value?: string) => {
    const match = value && /^\s*([\d.]+)\s*(px)?\s*$/i.exec(value)
    return match ? Number(match[1]) : null
  }
  const width = length(attr('width'))
  const height = length(attr('height'))
  const box = attr('viewBox')?.trim().split(/[\s,]+/).map(Number)
  const boxW = box?.length === 4 ? box[2] : null
  const boxH = box?.length === 4 ? box[3] : null

  if (width && height) return valid(width, height)
  if (boxW && boxH) {
    if (width) return valid(width, (width * boxH) / boxW)
    if (height) return valid((height * boxW) / boxH, height)
    return valid(boxW, boxH)
  }
  return null
}
