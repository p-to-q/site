import { WebVitals } from '@/components/layout/web-vitals'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 sm:px-0" style={{ paddingBottom: '3.5rem' }}>
      {children}
      <WebVitals />
    </main>
  )
}
