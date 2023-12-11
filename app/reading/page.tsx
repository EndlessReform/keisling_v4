import { Metadata } from 'next'
import { getSortedPostsData, ReadingFrontmatter } from '../../lib/get_posts'

import Link from 'next/link'
import { Stars } from '../../components'
import { LandingLayout } from '../../components'

// Assets
import { ArrowRight } from '@carbon/icons-react'

function Review(props: ReadingFrontmatter) {
  return (
    <li className="mt-4 block border-b border-gray-100 pb-4 sm:flex">
      <span className="ml-[-0.25rem] hidden pt-1 pr-2 text-fg sm:inline">
        <ArrowRight className="mr-2 h-6 w-6" />
      </span>
      <div>
        <h3 className="text-2xl tracking-tight">
          <Link
            href={`/reading/${props.id.split('.').splice(0, 1).join()}`}
            className="font-medium hover:text-brand-500"
          >
            {props.title}
          </Link>
          <p className="text-base text-gray-500 sm:inline sm:text-2xl">
            {props.author ? ` by ${props.author}` : ''}
          </p>
        </h3>
        <div className="flex items-center gap-2 font-mono text-gray-500">
          <Stars n={props.stars || 0} />
          {' | '}
          <span className="text-xs">Read {props.written}</span>
        </div>
      </div>
      <div className="mt-3 ml-auto flex gap-2 sm:mt-0">
        {props.tags?.split(',').map((tag: string, idx) => (
          <span key={idx}>
            <a className="rounded-lg bg-gray-100 px-2 py-1 font-mono text-xs font-medium uppercase text-fg hover:text-blue-500">
              {tag}
            </a>
          </span>
        ))}
      </div>
    </li>
  )
}

export const metadata: Metadata = {
  title: 'Reading',
  description: "Short notes on books I've read recently",
}

export default async function Reading() {
  const allPostsData = await getSortedPostsData('reading')

  return (
    <LandingLayout
      title="Reading"
      about="Short notes on books I've read recently"
    >
      <div className="border-t border-gray-300 text-fg">
        <ul>
          {allPostsData.map((data: ReadingFrontmatter) => (
            <Review {...data} key={data.id} />
          ))}
        </ul>
      </div>
    </LandingLayout>
  )
}
