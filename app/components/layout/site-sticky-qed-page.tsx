import { SiteDivider } from '@/components/layout/site-divider'
import { SiteHeader } from '@/components/layout/site-header'

/** Work / Writing: sticky bottom block matches About (`SiteDivider` + Q.E.D.); spacer preserves divider spacing. */
export function SiteStickyQedPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100dvh-5.5rem)] flex-col">
      <SiteHeader />
      {children}
      <div className="min-h-0 w-full flex-1" aria-hidden="true" />
      <SiteDivider />
      <footer aria-label="Closing">
        <p className="heading-text home-page-heading">Q.E.D.</p>
      </footer>
    </div>
  )
}
