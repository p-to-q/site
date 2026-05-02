import { IconLink } from '@/components/content/icon-link'
import { ArrowIcon } from '@/components/content/icons'
import { SiteDivider } from '@/components/layout/site-divider'
import { IconLinkList } from '@/components/primitives/icon-link-list'

export default function NotFound() {
  return (
    <section>
      <h1 className="mb-8 text-2xl tracking-tighter title-text normal-case">
        404 - Page Not Found
      </h1>
      <p className="body-text">The page you are looking for does not exist.</p>
      <SiteDivider />
      <footer>
        <IconLinkList>
          <li>
            <IconLink href="/" icon={<ArrowIcon />} aria-label="Back to home">
              back to home
            </IconLink>
          </li>
        </IconLinkList>
      </footer>
    </section>
  )
}
