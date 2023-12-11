import { getSortedPostsData, WritingFrontmatter } from '../../lib/get_posts'
import { Metadata } from 'next'

import Link from 'next/link'
import { LandingLayout, Tag } from '../../components'

// Assets
import { ArrowRight, Calendar } from '@carbon/icons-react'

function Post(props: WritingFrontmatter) {
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
      <div className="mt-3 ml-auto flex sm:mt-0">
        {props.tags?.split(',').map((tag: string, idx) => (
          <span key={idx}>
            <Tag>{tag}</Tag>
          </span>
        ))}
      </div>
    </li>
  )
}

export const metadata: Metadata = {
  title: 'Writing',
}

export default async function Writing() {
  const allPostsData = await getSortedPostsData('writing')
  return (
    <LandingLayout title="Writing" about="My thoughts">
      <div className="border-gray border-t text-fg">
        <ul>
          {allPostsData.map((data: WritingFrontmatter) => (
            <Post {...data} key={data.id} />
          ))}
        </ul>
      </div>
    </LandingLayout>
  )
}
