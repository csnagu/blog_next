import remark from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import gfm from 'remark-gfm'
import remarkSlug from 'remark-slug'


export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(gfm).use(html).use(prism).use(remarkSlug).process(markdown)
  return result.toString()
}
