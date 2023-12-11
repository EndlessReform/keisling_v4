import { getSortedPostsData, PostMetadata } from '../../lib/get_posts'

import Link from 'next/link'
import { LandingLayout } from '../../components'

// Assets
import { ArrowRight, Calendar } from '@carbon/icons-react'

function Post(props: PostMetadata) {
  return (
    <li className="mt-4 block border-b border-gray-100 pb-4 sm:flex">
      <span className="ml-[-0.25rem] hidden pt-1 pr-2 text-fg sm:inline">
        <ArrowRight className="h-6 w-6" />
      </span>
      <div>
        <h3 className="mb-2 text-2xl tracking-tight">
          <Link
            href={`/writing/${props.id.split('.').splice(0, 1).join()}`}
            className="font-medium hover:text-brand-500"
          >
            {props.title}
          </Link>
        </h3>
        <p className="max-w-xl text-sm text-gray-500">{props.summary}</p>
        <div className="mt-3 flex items-center font-mono text-gray-500">
          <span className="flex items-center text-xs ">
            <Calendar className="mr-2 h-3 w-3" /> {props.written}
          </span>
        </div>
      </div>
      <div className="mt-3 ml-auto flex gap-2 sm:mt-0">
        {props.tags?.split(',').map((tag: string, idx) => (
          <span key={idx}>
            <a className="rounded-lg bg-gray-100 px-2 py-1 font-mono text-xs font-medium uppercase text-fg hover:text-blue-600">
              {tag}
            </a>
          </span>
        ))}
      </div>
    </li>
  )
}

export default async function Writing() {
  const allPostsData = await getSortedPostsData('writing')
  return (
    <LandingLayout title="Writing" about="My thoughts">
      <div className="border-gray border-t text-fg">
        <ul>
          {allPostsData.map((data: PostMetadata) => (
            <Post {...data} key={data.id} />
          ))}
        </ul>
      </div>
    </LandingLayout>
  )
}
