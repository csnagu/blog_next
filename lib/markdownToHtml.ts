import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import gfm from 'remark-gfm'
import linkCard from 'remark-link-card'

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(gfm).use(html).use(prism).use(linkCard).process(markdown)
  return result.toString()
}
