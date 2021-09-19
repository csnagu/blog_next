import PostPreview from './post-preview'
import Post from '../types/post'

type Props = {
  posts: Post[]
}

const draft_pattern = /^\[draft\]/i

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-y-6 mb-32">
        {posts.map((post) => {
          if (!draft_pattern.test(post.title)) {
            return (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />)
          }
        })}
      </div>
    </section>
  )
}

export default MoreStories
