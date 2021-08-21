import DateFormatter from './date-formatter'
import Link from 'next/link'
import Author from '../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const PostPreview = ({
  title,
  date,
  excerpt,
  slug,
}: Props) => {
  return (
    <div>
      <h3 className="text-xl mb-1 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-sm mb-4 text-gray-400">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-sm leading-relaxed mb-4 text-gray-400">{excerpt}</p>
    </div>
  )
}

export default PostPreview
