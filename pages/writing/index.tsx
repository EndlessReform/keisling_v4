import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getSortedPostsData, PostMetadata } from '../../lib/get_posts'

import Link from 'next/link'
import LandingLayout from '../../components/landing-layout/landing-layout'

// Assets
import ArrowRight from '../../public/icons/arrow-right.svg'
import Calendar from '../../public/icons/calendar.svg'

function Post(props: PostMetadata) {
  return (
    <li className="block pb-4 mt-4 border-b border-pink-light sm:flex">
      <span className="ml-[-0.25rem] hidden pt-1 pr-1 text-green sm:inline">
        <ArrowRight className="w-6 h-6" />
      </span>
      <div>
        <h3 className="mb-2 text-2xl tracking-tight">
          <Link href={`/writing/${props.id.split('.').splice(0, 1).join()}`}>
            <a className="font-medium hover:text-green">{props.title}</a>
          </Link>
        </h3>
        <p className="max-w-xl text-sm text-gray">{props.summary}</p>
        <div className="flex items-center mt-3 font-mono text-gray">
          <span className="flex items-center text-xs ">
            <Calendar className="w-3 h-3 mr-2" /> {props.written}
          </span>
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

export default function Writing({
  allPostsData,
}: InferGetStaticPropsType<GetStaticProps>) {
  return (
    <LandingLayout title="Writing" about="Lol idfk">
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
