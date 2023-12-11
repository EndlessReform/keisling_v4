import { HTMLProps } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Components
import {
  getSortedPostsData,
  ReadingFrontmatter,
  PostMetadata,
} from '../lib/get_posts'
import { get_links } from '../lib/get_links'
import { Hero } from '../components/Hero'
import { Container } from '../components'
import ButtonLink from '../components/ButtonLink/button_link'

import { ArrowRight, Calendar, LocationHeartFilled } from '@carbon/icons-react'
import SpotIllustrationLiteracy from '../public/images/spot-illustration-literacy.png'
import SpotIllustrationWriting from '../public/images/spot-illustration-writing.png'
import SpotIllustrationMap from '../public/images/spot-illustration-map.png'
import MeCutout from '../public/images/me-cutout.png'

// Assets
import { Stars } from '../components'
//import PageHead from '../components/page-head/page-head'

const SectionHeader = (props: HTMLProps<HTMLHeadingElement>) => (
  <h2
    className="font-stretch-expanded mt-6 mb-4 text-3xl font-medium text-gray-800"
    {...props}
  />
)

// Yes, I know, you could also do this with classes instead of components.
// But it's my circus and my monkeys...
const FeatureContainer = (props: HTMLProps<HTMLDivElement>) => (
  <div className="mb-20 grid gap-6 md:grid-cols-2" {...props} />
)

const FTImageContainer = (props: HTMLProps<HTMLDivElement>) => (
  <div
    className="flex min-h-[20rem] min-w-[20rem] items-center justify-around rounded-2xl bg-gray-100 px-6 py-4"
    {...props}
  />
)

const ReviewContainer: React.FC<
  { reviews: ReadingFrontmatter[] } & HTMLProps<HTMLDivElement>
> = ({ reviews, ...rest }) => (
  <div className="mb-6 w-full rounded-xl border-2 border-gray-100">
    {reviews
      ? reviews.slice(0, 3).map((review: ReadingFrontmatter, idx: number) => (
          <div
            key={idx}
            className="flex border-b-2 border-gray-100 px-2 py-3 text-gray-800 last-of-type:border-none"
          >
            <ArrowRight className="mt-[7px] mr-2 h-4 w-4" />
            <div>
              <h4 className="font-stretch-expanded text-xl font-light hover:underline hover:underline-offset-4">
                <Link href={`/reading/${review.id.split('.')[0]}`}>
                  {review.title}
                </Link>
              </h4>
              <p className="text-sm text-gray-500">{review.author}</p>
              <div className="mt-3 flex items-center font-mono text-gray-500">
                <Stars n={review.stars || 0} />
                <span className="ml-2 text-xs">
                  {' | '}
                  {review.written}
                </span>
              </div>
            </div>
          </div>
        ))
      : null}
  </div>
)

const PostContainer: React.FC<
  { posts: PostMetadata[] } & HTMLProps<HTMLDivElement>
> = ({ posts, ...rest }) => {
  return (
    <div className="mb-6 w-full rounded-xl border-2 border-gray-100">
      {posts
        ? posts.slice(0, 3).map((post: PostMetadata, idx: number) => (
            <div
              key={idx}
              className="flex border-b-2 border-gray-100 p-2 last-of-type:border-none"
            >
              <div className="m-3">
                <h4 className="font-stretch-expanded text-xl font-light hover:underline hover:underline-offset-4">
                  <Link href={`/writing/${post.id.split('.')[0]}`}>
                    {post.title}
                  </Link>
                </h4>
                <p className="text-sm text-gray-500">{post.summary}</p>
                <div className="mt-3 flex items-center font-mono text-gray-500">
                  <span className="flex items-center text-xs ">
                    <Calendar className="mr-2 h-3 w-3" /> {post.written}
                  </span>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  )
}

const LinksContainer: React.FC<
  { linkObj: object } & HTMLProps<HTMLDivElement>
> = ({ linkObj, ...rest }) => {
  let links = Object.values(linkObj).flat()
  return (
    <div className="mb-6 w-full rounded-xl border-2 border-gray-100">
      {links
        ? links.slice(0, 4).map((link: any, idx: number) => (
            <div
              key={idx}
              className="flex border-b-2 border-gray-100 p-2 last-of-type:border-none"
            >
              <ArrowRight className="mt-[6px] h-4 w-4 text-blue-600" />
              <div className="ml-2">
                <h4 className="text-lg text-blue-600 hover:text-blue-800 hover:underline hover:underline-offset-4">
                  <a href={link.url}>{link.name}</a>
                </h4>
                {link.summary && (
                  <p className="text-gray text-sm">{link.summary}</p>
                )}
              </div>
            </div>
          ))
        : null}
    </div>
  )
}

async function Home() {
  // I hope to god this is actually static. Lee Robinson's blog is a bit confusing on this point.
  const readingPosts = await getSortedPostsData('reading')
  const writingPosts = await getSortedPostsData('writing')
  const recommendedLinks = await get_links()

  return (
    <Container>
      <main className="w-full text-gray-800">
        <Hero />
        <FeatureContainer>
          <div className="border-t-2 border-gray-100">
            <Link href="/about">
              <SectionHeader>Hello!</SectionHeader>
            </Link>
            <p className="mb-6 max-w-md font-serif text-xl font-light leading-none text-gray-500">
              <span className="text-md font-normal text-fg">
                I'm Jacob, and you've found my personal website,
              </span>{' '}
              for better or worse. I write here about language models,
              full-stack development, UX design, and whatever else I'm thinking
              about.
            </p>
            <div className="flex">
              <ButtonLink
                to="/about"
                display_name="About me"
                className="border border-brand-500 text-brand-500 hover:border-brand-600 hover:text-brand-600"
              />
              <ButtonLink
                to="https://www.linkedin.com/in/jacob-keisling-b474a7174/"
                display_name="LinkedIn"
                className="border border-gray-500 text-gray-500 hover:border-gray-600 hover:text-gray-600"
              />
            </div>
          </div>
          <FTImageContainer>
            <Image
              src={MeCutout}
              alt="Illustration of me"
              className="py-12"
              height={232}
            />
          </FTImageContainer>
        </FeatureContainer>
        <FeatureContainer>
          <div className="border-t-2 border-gray-100">
            <SectionHeader>Reading</SectionHeader>
            <p className="mb-6 font-serif text-lg font-light text-gray-500">
              Brief thoughts on what I've been reading lately
            </p>
            <ReviewContainer reviews={readingPosts} />
            <div className="flex">
              <ButtonLink
                to="/reading"
                display_name={`${
                  readingPosts ? Math.max(0, readingPosts.length - 3) : 0
                } more`}
                className="border border-gray-500 text-gray-500 hover:border-gray-600 hover:text-gray-600"
              />
            </div>
          </div>
          <FTImageContainer>
            <Image
              src={SpotIllustrationLiteracy}
              alt="Illustration of reading"
              className="rounded-[8rem]"
            />
          </FTImageContainer>
        </FeatureContainer>
        <FeatureContainer>
          <div className="border-t-2 border-gray-100">
            <SectionHeader>Writing</SectionHeader>
            <PostContainer posts={writingPosts} />
            <div className="flex">
              <ButtonLink
                to="/writing"
                display_name={`${
                  writingPosts ? Math.max(0, writingPosts.length - 3) : 0
                } more`}
                className="border border-gray-500 text-gray-500 hover:border-gray-600 hover:text-gray-600"
              />
            </div>
          </div>
          <FTImageContainer>
            <Image
              src={SpotIllustrationWriting}
              alt="Illustration of writing"
              className="rounded-full"
            />
          </FTImageContainer>
        </FeatureContainer>
        <FeatureContainer>
          <div className="border-t-2 border-gray-100">
            <SectionHeader>Links</SectionHeader>
            <p className="text-gray mb-6 font-serif text-lg font-light text-gray-500">
              Interesting websites you might have missed
            </p>
            <LinksContainer linkObj={recommendedLinks} />
            <div className="flex">
              <ButtonLink
                to="/links"
                display_name={`${
                  recommendedLinks
                    ? Math.max(
                        0,
                        Object.values(recommendedLinks).flat().length - 4
                      )
                    : 0
                } more`}
                className="border border-gray-500 text-gray-500 hover:border-gray-600 hover:text-gray-600"
              />
            </div>
          </div>
          <FTImageContainer>
            <Image
              src={SpotIllustrationMap}
              alt="Illustration of navigating a map"
              className="rounded-full"
            />
          </FTImageContainer>
        </FeatureContainer>
      </main>
    </Container>
  )
}

export default Home
