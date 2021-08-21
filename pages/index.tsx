import Container from '../components/container'
import MoreStories from '../components/more-stories'
import Profile from '../components/profile'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { author, BLOG_TITLE } from '../lib/constants'
import Post from '../types/post'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{BLOG_TITLE}</title>
        </Head>
        <Container>
          <Intro />
          <Profile name={author.name} picture={author.picture} />
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
