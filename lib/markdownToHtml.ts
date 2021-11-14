import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import gfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'

export default async function markdownToHtml(raw_markdown: string) {
  const toc_markdown = "## 目次\n" + raw_markdown
  const result = await remark().use(gfm).use(html, { sanitize: false }).use(prism).use(remarkSlug).use(remarkToc, { heading: "目次" }).process(toc_markdown)
  return result.toString()
}
