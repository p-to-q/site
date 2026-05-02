import { describe, expect, it } from 'vitest'
import { EVENTS_LIST_ITEMS, POSTS_LIST_ITEMS, PROJECT_LIST_ITEMS, SOUNDS_LIST_ITEMS } from './page-data'

describe('page-data', () => {
  it('exports non-empty list sections', () => {
    expect(PROJECT_LIST_ITEMS.length).toBeGreaterThan(0)
    expect(POSTS_LIST_ITEMS.length).toBeGreaterThan(0)
    expect(SOUNDS_LIST_ITEMS.length).toBeGreaterThan(0)
    expect(EVENTS_LIST_ITEMS.length).toBeGreaterThan(0)
  })
})
