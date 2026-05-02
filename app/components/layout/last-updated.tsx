import { SITE_LAST_UPDATED_ISO } from '@/lib/build-info'

function formatUpdated(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null

  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  }).format(d)
}

export function LastUpdated() {
  const formatted = formatUpdated(SITE_LAST_UPDATED_ISO)
  if (!formatted) return null

  return <span className="body-text">updated {formatted}</span>
}

