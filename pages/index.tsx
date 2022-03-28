import { HTMLProps } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Components
import {
  getSortedPostsData,
  ReviewMetadata,
  PostMetadata,
} from '../lib/get_posts'
import { get_links } from '../lib/get_links'
import Container from '../components/container/container'
import Layout from '../components/layout/layout'
import ButtonLink from '../components/ButtonLink/button_link'

// Assets
import ArrowRight from '../public/icons/arrow-right.svg'
import Book from '../public/images/book.svg'
import Calendar from '../public/icons/calendar.svg'
import LocationIcon from '../public/icons/location.svg'
import Orbit from '../public/images/orbit.svg'
import LinkCenter from '../public/images/center.svg'
import LinkArrows from '../public/images/arrows.svg'
import Sheets from '../public/images/sheets.svg'
import Stars from '../components/stars/stars'

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full sm:flex-row ">
      <div className="flex flex-col items-center sm:mr-auto sm:inline">
        <h1 className="text-5xl font-medium tracking-tight text-blue">
          Jacob Keisling
        </h1>
        <div className="items-center hidden mt-3 text-gray sm:flex">
          <LocationIcon className="mr-3" />
          <h4 className="text-2xl font-medium tracking-tight">
            Student, University of Chicago
          </h4>
        </div>
      </div>
      <Image width="128px" height="128px" src="/images/me.png" />
    </div>
  )
}

// Yes, I know, you could also do this with classes instead of components.
// But it's my circus and my monkeys...
const FeatureContainer = (props: HTMLProps<HTMLDivElement>) => (
  <div className="grid gap-6 mb-20 md:grid-cols-2" {...props} />
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
  <div className="w-full mb-6 border-2 rounded-xl border-pink-light">
    {reviews
      ? reviews.slice(0, 3).map((review: ReviewMetadata, idx: number) => (
          <div
            key={idx}
            className="flex px-2 py-3 border-b-2 border-pink-light last-of-type:border-none"
          >
            <ArrowRight className="mt-[5px] mr-1 h-4 w-4 text-red" />
            <div>
              <h4 className="text-lg text-red hover:underline hover:underline-offset-4">
                <Link href={`/reading/${review.id.split('.')[0]}`}>
                  <a>{review.title}</a>
                </Link>
              </h4>
              <p className="text-sm text-fg">{review.author}</p>
              <div className="flex items-center mt-3 font-mono text-gray">
                <Stars n={review.stars} />
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
    <div className="w-full mb-6 border-2 rounded-xl border-pink-light">
      {posts
        ? posts.slice(0, 3).map((post: PostMetadata, idx: number) => (
            <div
              key={idx}
              className="flex px-2 py-3 border-b-2 border-pink-light last-of-type:border-none"
            >
              <div className="m-3">
                <h4 className="text-lg text-green hover:underline hover:underline-offset-4">
                  <Link href={`/writing/${post.id.split('.')[0]}`}>
                    <a>{post.title}</a>
                  </Link>
                </h4>
                <p className="text-sm text-gray">{post.summary}</p>
                <div className="flex items-center mt-3 font-mono text-gray">
                  <span className="flex items-center text-xs ">
                    <Calendar className="w-3 h-3 mr-2" /> {post.written}
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
    <div className="w-full mb-6 border-2 rounded-xl border-pink-light">
      {links
        ? links.map((link: any, idx: number) => (
            <div
              key={idx}
              className="flex p-2 border-b-2 border-pink-light last-of-type:border-none"
            >
              <p className="mt-1 text-sm text-purple">🡪</p>
              <div className="ml-2">
                <h4 className="text-lg text-purple hover:underline hover:underline-offset-4">
                  <a href={link.url}>{link.name}</a>
                </h4>
                {link.summary && (
                  <p className="text-sm text-gray">{link.summary}</p>
                )}
              </div>
            </div>
          ))
        : null}
    </div>
  )
}

const Home: NextPage = (props: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <Layout>
      <Container>
        <Head>
          <title>Jacob Keisling</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="w-full">
          <Hero />
          <FeatureContainer>
            <div className="border-t-2 border-pink-light">
              <Link href="/about">
                <h2 className="my-6 text-3xl font-medium tracking-tight text-blue">
                  <a>About Me</a>
                </h2>
              </Link>
              <p className="mb-6 text-gray">
                <span className="font-medium text-fg">
                  This is the website of Gwern Branwen.
                </span>{' '}
                I write about psychology, statistics, and technology. I am best
                known for work on the darknet markets & Bitcoin⁠, blinded
                self-experiments⁠, dual n-back & spaced repetition⁠, and anime
                neural networks⁠.
              </p>
              <div className="flex">
                <ButtonLink
                  to="/about"
                  display_name="Learn more"
                  className="bg-blue text-bg"
                />
                <ButtonLink
                  to="https://www.linkedin.com/in/jacob-keisling-b474a7174/"
                  display_name="LinkedIn"
                  className="bg-pink-light text-blue"
                />
              </div>
            </div>
            <FTImageContainer>
              <Orbit />
            </FTImageContainer>
          </FeatureContainer>
          <FeatureContainer>
            <div className="border-t-2 border-pink-light">
              <h2 className="my-6 text-3xl font-medium tracking-tight text-red">
                Reading
              </h2>
              <ReviewContainer reviews={props.reviews} />
              <div className="flex">
                <ButtonLink
                  to="/reading"
                  display_name={`${
                    props.reviews ? Math.max(0, props.reviews.length - 3) : 0
                  } more`}
                  className="bg-red text-bg"
                />
              </div>
            </div>
            <FTImageContainer>
              <Sheets />
            </FTImageContainer>
          </FeatureContainer>
          <FeatureContainer>
            <div className="border-t-2 border-pink-light">
              <h2 className="my-6 text-3xl font-medium tracking-tight text-green">
                Writing
              </h2>
              <PostContainer posts={props.posts} />
              <div className="flex">
                <ButtonLink
                  to="/writing"
                  display_name={`${
                    props.posts ? Math.max(0, props.posts.length - 3) : 0
                  } more`}
                  className="bg-green text-bg"
                />
              </div>
            </div>
            <FTImageContainer>
              <Book />
            </FTImageContainer>
          </FeatureContainer>
          <FeatureContainer>
            <div className="border-t-2 border-pink-light">
              <h2 className="my-6 text-3xl font-medium tracking-tight text-purple">
                Links
              </h2>
              <p className="mb-6 text-gray">
                The best content I could find on the internet
              </p>
              <LinksContainer linkObj={props.links} />
              <div className="flex">
                <ButtonLink
                  to="/links"
                  display_name={`${
                    props.links
                      ? Math.max(
                          0,
                          Object.values(props.links).flat().length - 4
                        )
                      : 0
                  } more`}
                  className="bg-purple text-bg"
                />
              </div>
            </div>
            <div className="flex min-h-[20rem] min-w-[20rem] items-center justify-around overflow-hidden rounded-2xl bg-pink-light">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              >
                <LinkArrows className="m-auto" />
              </motion.div>
              <div className="absolute z-20 flex flex-col items-center w-full mx-auto">
                <LinkCenter className="w-20 h-20" />
              </div>
            </div>
          </FeatureContainer>
        </main>
      </Container>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  let reviews = getSortedPostsData('reading')
  let posts = getSortedPostsData('writing')
  let links = get_links()
  return {
    props: {
      reviews,
      posts,
      links,
    },
  }
}
