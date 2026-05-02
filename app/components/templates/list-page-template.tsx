import type { ListPageItem } from '@/lib/list-page-types'
import { ListPageTemplateRow } from '@/components/templates/list-page-template-row'

interface ListPageTemplateProps {
  title: string
  items: readonly ListPageItem[]
}

export function ListPageTemplate({ title, items }: ListPageTemplateProps) {
  return (
    <section>
      <h1 className="mb-8 text-2xl tracking-tighter title-text normal-case">{title}</h1>

      <ul className="space-y-2">
        {items.map((item) => (
          <ListPageTemplateRow key={`${item.href}-${item.title}`} item={item} />
        ))}
      </ul>
    </section>
  )
}
