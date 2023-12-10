import { HTMLProps } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Components
import {
  getSortedPostsData,
  ReviewMetadata,
  PostMetadata,
} from '../lib/get_posts'
import { get_links } from '../lib/get_links'
import Container from '../components/container/container'
import ButtonLink from '../components/ButtonLink/button_link'

import { ArrowRight, Calendar, LocationHeartFilled } from '@carbon/icons-react'

// Assets
import { Stars } from '../components'
//import PageHead from '../components/page-head/page-head'

const Hero = () => {
  return (
    <div className="flex w-full flex-col items-center sm:flex-row ">
      <div className="flex flex-col items-center sm:mr-auto sm:inline">
        <h1 className="text-5xl font-medium tracking-tight text-brand-500">
          Jacob Keisling
        </h1>
        <div className="mt-3 hidden items-center text-gray-400 sm:flex">
          <LocationHeartFilled className="mr-3" />
          <h4 className="text-2xl font-medium tracking-tight">Chicago, IL</h4>
        </div>
      </div>
      <Image
        width="128"
        height="128"
        src="/images/me.png"
        alt="Jacob Keisling"
      />
    </div>
  )
}

// Yes, I know, you could also do this with classes instead of components.
// But it's my circus and my monkeys...
const FeatureContainer = (props: HTMLProps<HTMLDivElement>) => (
  <div className="mb-20 grid gap-6 md:grid-cols-2" {...props} />
)

const FTImageContainer = (props: HTMLProps<HTMLDivElement>) => (
  <div
    className="flex min-h-[20rem] min-w-[20rem] items-center justify-around rounded-2xl bg-pink-light"
    {...props}
  />
)

const ReviewContainer: React.FC<
  { reviews: ReviewMetadata[] } & HTMLProps<HTMLDivElement>
> = ({ reviews, ...rest }) => (
  <div className="mb-6 w-full rounded-xl border-2 border-gray-100">
    {reviews
      ? reviews.slice(0, 3).map((review: ReviewMetadata, idx: number) => (
          <div
            key={idx}
            className="flex border-b-2 border-gray-100 px-2 py-3 last-of-type:border-none"
          >
            <ArrowRight className="mt-[7px] mr-1 h-4 w-4 text-red" />
            <div>
              <h4 className="text-xl text-red hover:underline hover:underline-offset-4">
                <Link href={`/reading/${review.id.split('.')[0]}`}>
                  {review.title}
                </Link>
              </h4>
              <p className="text-sm text-fg">{review.author}</p>
              <div className="text-gray mt-3 flex items-center font-mono">
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
                <h4 className="text-xl text-green hover:underline hover:underline-offset-4">
                  <Link href={`/writing/${post.id.split('.')[0]}`}>
                    {post.title}
                  </Link>
                </h4>
                <p className="text-gray text-sm">{post.summary}</p>
                <div className="text-gray mt-3 flex items-center font-mono">
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
              <ArrowRight className="mt-[7px] h-4 w-4 text-purple" />
              <div className="ml-2">
                <h4 className="text-xl text-purple hover:underline hover:underline-offset-4">
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
      <main className="w-full">
        <Hero />
        <FeatureContainer>
          <div className="border-t-2 border-gray-100">
            <Link href="/about">
              <h2 className="my-6 text-4xl font-medium tracking-tight text-blue">
                About
              </h2>
            </Link>
            <p className="mb-6 text-lg text-gray-500">
              <span className="font-medium text-fg">
                You've found Jacob Keisling's personal website,
              </span>{' '}
              for better or worse. I write about deep learning, front-end
              development, hardware, progress studies, and East Asian history.
            </p>
            <div className="flex">
              <ButtonLink
                to="/about"
                display_name="About me"
                className="bg-blue text-bg"
              />
              <ButtonLink
                to="https://www.linkedin.com/in/jacob-keisling-b474a7174/"
                display_name="LinkedIn"
                className="bg-pink-light text-blue"
              />
            </div>
          </div>
          <FTImageContainer></FTImageContainer>
        </FeatureContainer>
        <FeatureContainer>
          <div className="border-t-2 border-gray-100">
            <h2 className="my-6 text-4xl font-medium tracking-tight text-red">
              Reading
            </h2>
            <p className="text-gray mb-6 text-lg">
              Brief thoughts on what I've been reading lately
            </p>
            <ReviewContainer reviews={readingPosts} />
            <div className="flex">
              <ButtonLink
                to="/reading"
                display_name={`${
                  readingPosts ? Math.max(0, readingPosts.length - 3) : 0
                } more`}
                className="bg-red text-bg"
              />
            </div>
          </div>
          <FTImageContainer></FTImageContainer>
        </FeatureContainer>
        <FeatureContainer>
          <div className="border-t-2 border-gray-100">
            <h2 className="my-6 text-4xl font-medium tracking-tight text-green">
              Writing
            </h2>
            <PostContainer posts={writingPosts} />
            <div className="flex">
              <ButtonLink
                to="/writing"
                display_name={`${
                  writingPosts ? Math.max(0, writingPosts.length - 3) : 0
                } more`}
                className="bg-green text-bg"
              />
            </div>
          </div>
          <FTImageContainer></FTImageContainer>
        </FeatureContainer>
        <FeatureContainer>
          <div className="border-t-2 border-gray-100">
            <h2 className="my-6 text-4xl font-medium tracking-tight text-purple">
              Links
            </h2>
            <p className="text-gray mb-6 text-lg">
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
                className="bg-purple text-bg"
              />
            </div>
          </div>
          <div className="flex min-h-[20rem] w-full items-center justify-around overflow-hidden rounded-2xl bg-pink-light">
            <div className="absolute z-20 mx-auto flex flex-col items-center"></div>
          </div>
        </FeatureContainer>
      </main>
    </Container>
  )
}

export default Home
