import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getSortedPostsData, ReviewMetadata } from '../../lib/get_posts'

import Link from 'next/link'
import { Stars } from '../../components'
import LandingLayout from '../../components/landing-layout/landing-layout'

// Assets
import ArrowRight from '../../public/icons/arrow-right.svg'

function Review(props: ReviewMetadata) {
  return (
    <li className="mt-4 block border-b border-gray-100 pb-4 sm:flex">
      <span className="ml-[-0.25rem] hidden pt-1 pr-1 text-red sm:inline">
        <ArrowRight className="h-6 w-6" />
      </span>
      <div>
        <h3 className="text-2xl tracking-tight">
          <Link
            href={`/reading/${props.id.split('.').splice(0, 1).join()}`}
            className="font-medium hover:text-red"
          >
            {props.title}
          </Link>
          <p className="text-base text-gray-500 sm:inline sm:text-2xl">
            {props.author ? ` by ${props.author}` : ''}
          </p>
        </h3>
        <div className="text-gray flex items-center gap-2 font-mono">
          <Stars n={props.stars || 0} />
          {' | '}
          <span className="text-xs">Read {props.written}</span>
        </div>
      </div>
      <div className="mt-3 ml-auto flex gap-2 sm:mt-0">
        {props.tags?.split(',').map((tag: string, idx) => (
          <span key={idx}>
            <a className="rounded-lg bg-pink-light px-2 py-1 font-mono text-xs font-medium uppercase text-fg hover:text-red">
              {tag}
            </a>
          </span>
        ))}
      </div>
    </li>
  )
}

export default function Reading({
  allPostsData,
}: InferGetStaticPropsType<GetStaticProps>) {
  return (
    <LandingLayout
      title="Reading"
      about="Short notes on books I've read recently"
    >
      <div className="border-gray border-t text-fg">
        <ul>
          {allPostsData.map((data: ReviewMetadata) => (
            <Review {...data} key={data.id} />
          ))}
        </ul>
      </div>
    </LandingLayout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData('reading')
  return {
    props: {
      allPostsData,
    },
  }
}
