import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { BLOG_TITLE } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import { FacebookIcon, FacebookShareButton, HatenaIcon, HatenaShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import ReactMarkdownHeading from 'react-markdown-heading'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ post, preview }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-12">
              <Head>
                <title>
                  {post.title} | {BLOG_TITLE}
                </title>
                <meta property="og:image" content={post.ogImage.url} />
                <meta property="og:url" content={`https://blog.nagu.dev/posts/${post.slug}`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="@cs_nagu" />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <div id="toc" className="max-w-4xl mx-auto border-t-2 border-b-2 py-4 pl-12">
                <ReactMarkdownHeading markdown={post.markdown} hyperlink={true} />
              </div>
              <PostBody content={post.content} />
            </article>
            <div id="sns-share" className="flex justify-center pb-10">
              <FacebookShareButton url={`https://blog.nagu.dev/posts/${post.slug}`} className="mx-3">
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <LinkedinShareButton url={`https://blog.nagu.dev/posts/${post.slug}`} className="mx-3">
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>
              <TwitterShareButton url={`https://blog.nagu.dev/posts/${post.slug}`} className="mx-3">
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <HatenaShareButton url={`https://blog.nagu.dev/posts/${post.slug}`} className="mx-3">
                <HatenaIcon size={32} round={true} />
              </HatenaShareButton>
            </div>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const markdown = post.content
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
        markdown,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
