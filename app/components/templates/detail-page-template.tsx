import { IconLink } from '@/components/content/icon-link'
import { ArrowIcon } from '@/components/content/icons'
import { SiteDivider } from '@/components/layout/site-divider'
import { IconLinkList } from '@/components/primitives/icon-link-list'

interface DetailPageTemplateProps {
  title: React.ReactNode
  /** Optional date shown only in the detail hero row (not on list pages). */
  date?: React.ReactNode
  /** Optional leading visual block (image/video/gallery) rendered above the title row. */
  hero?: React.ReactNode
  children: React.ReactNode
  actions?: React.ReactNode
  backHref?: string
  backLabel?: React.ReactNode
  titleClassName?: string
}

export function DetailPageTemplate({
  title,
  date,
  hero,
  children,
  actions,
  backHref,
  backLabel,
  titleClassName = '',
}: DetailPageTemplateProps) {
  const titleRowStyle = {
    marginTop: hero ? '3rem' : undefined,
    marginBottom: '3rem',
  }
  return (
    <section>
      {hero}

      {date ? (
        <div style={titleRowStyle}>
          <h1 className={`text-2xl tracking-tighter title-text normal-case ${titleClassName}`}>{title}</h1>
          <span className="body-text block" style={{ marginTop: '1rem' }}>{date}</span>
        </div>
      ) : (
        <h1 className={`text-2xl tracking-tighter title-text normal-case ${titleClassName}`} style={titleRowStyle}>{title}</h1>
      )}

      {children}

      {actions ? <div className="mb-8 mt-10">{actions}</div> : null}

      <SiteDivider />
      {backHref && backLabel ? (
        <footer>
          <IconLinkList>
            <li>
              <IconLink href={backHref} icon={<ArrowIcon />} aria-label={`Back to ${String(backLabel)}`}>
                {backLabel}
              </IconLink>
            </li>
          </IconLinkList>
        </footer>
      ) : null}
    </section>
  )
}
