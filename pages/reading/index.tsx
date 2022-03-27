import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getSortedPostsData, ReviewMetadata } from '../../lib/get_posts'

import Link from 'next/link'
import Stars from '../../components/stars/stars'
import LandingLayout from '../../components/landing-layout/landing-layout'

// Assets
import ArrowRight from '../../public/icons/arrow-right.svg'

function Review(props: ReviewMetadata) {
  return (
    <li className="block pb-4 mt-4 border-b border-pink-light sm:flex">
      <span className="ml-[-0.25rem] hidden pt-1 pr-1 text-red sm:inline">
        <ArrowRight className="w-6 h-6" />
      </span>
      <div>
        <h3 className="text-2xl tracking-tight">
          <Link href={`/reading/${props.id.split('.').splice(0, 1).join()}`}>
            <a className="font-medium hover:text-red">{props.title}</a>
          </Link>
          <p className="text-base text-gray sm:inline sm:text-2xl">
            {props.author ? ` by ${props.author}` : ''}
          </p>
        </h3>
        <div className="flex items-center gap-2 font-mono text-gray">
          <Stars n={props.stars} />
          {' | '}
          <span className="text-xs">Read {props.written}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-3 ml-auto sm:mt-0">
        {props.tags.split(',').map((tag: string, idx) => (
          <span key={idx}>
            <a className="px-2 py-1 font-mono text-xs font-medium uppercase rounded-lg bg-pink-light text-fg hover:text-red">
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
    <LandingLayout title="Reading" about="book reviews  or smth">
      <div className="border-t border-gray text-fg">
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
