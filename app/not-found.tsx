import type { Metadata } from 'next'
import { NotFoundSection } from '@/components/content/not-found-section'

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'This page does not follow.',
}

export default function NotFound() {
  return <NotFoundSection />
}
