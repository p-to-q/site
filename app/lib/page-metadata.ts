import type { Metadata } from 'next'

/** Route-level metadata helper — common title + description shape. */
export function pageMeta(input: { title: string; description: string }): Metadata {
  return {
    title: input.title,
    description: input.description,
  }
}
