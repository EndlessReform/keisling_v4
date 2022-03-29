import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getSortedPostsData, PostMetadata } from '../../lib/get_posts'

import Link from 'next/link'
import LandingLayout from '../../components/landing-layout/landing-layout'

// Assets
import ArrowRight from '../../public/icons/arrow-right.svg'
import Calendar from '../../public/icons/calendar.svg'

function Post(props: PostMetadata) {
  return (
    <li className="mt-4 block border-b border-pink-light pb-4 sm:flex">
      <span className="ml-[-0.25rem] hidden pt-1 pr-1 text-green sm:inline">
        <ArrowRight className="h-6 w-6" />
      </span>
      <div>
        <h3 className="mb-2 text-2xl tracking-tight">
          <Link href={`/writing/${props.id.split('.').splice(0, 1).join()}`}>
            <a className="font-medium hover:text-green">{props.title}</a>
          </Link>
        </h3>
        <p className="max-w-xl text-sm text-gray">{props.summary}</p>
        <div className="mt-3 flex items-center font-mono text-gray">
          <span className="flex items-center text-xs ">
            <Calendar className="mr-2 h-3 w-3" /> {props.written}
          </span>
        </div>
      </div>
      <div className="mt-3 ml-auto flex gap-2 sm:mt-0">
        {props.tags.split(',').map((tag: string, idx) => (
          <span key={idx}>
            <a className="rounded-lg bg-pink-light px-2 py-1 font-mono text-xs font-medium uppercase text-fg hover:text-green">
              {tag}
            </a>
          </span>
        ))}
      </div>
    </li>
  )
}

export default function Writing({
  allPostsData,
}: InferGetStaticPropsType<GetStaticProps>) {
  return (
    <LandingLayout title="Writing" about="My thoughts">
      <div className="border-t border-gray text-fg">
        <ul>
          {allPostsData.map((data: PostMetadata) => (
            <Post {...data} key={data.id} />
          ))}
        </ul>
      </div>
    </LandingLayout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData('writing')
  return {
    props: {
      allPostsData,
    },
  }
}
