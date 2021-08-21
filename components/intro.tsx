import { BLOG_TITLE, BLOG_DESCRIPTION } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-24">
      <h1 className="text-6xl font-bold tracking-tighter leading-tight md:pr-8">
        {BLOG_TITLE}
      </h1>
      <h4 className="text-center md:text-left text-base mt-5">
        {BLOG_DESCRIPTION}
      </h4>
    </section>
  )
}

export default Intro
