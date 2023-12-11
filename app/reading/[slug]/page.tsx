import { Metadata } from 'next'
import { readFile, readdir } from 'fs/promises'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { Calendar, Tag } from '@carbon/icons-react'

import { articleShortcodes, Container, Stars } from '../../../components'
import { ReadingFrontmatter } from '../../../lib/get_posts'

export const metadata: Metadata = {
  title: 'FIX THIS!!!',
}

export default async function BookReview({
  params,
}: {
  params: { slug: string }
}) {
  // God, this is so stupid
  const fullPath = path.join(
    process.cwd(),
    'posts',
    'reading',
    `${params?.slug ? params?.slug : 'index'}.mdx`
  )

  const source = await readFile(fullPath, 'utf-8')

  // https://github.com/hashicorp/next-mdx-remote#react-server-components-rsc--nextjs-app-directory-support
  const { content, frontmatter } = await compileMDX<ReadingFrontmatter>({
    source,
    components: { ...articleShortcodes },
    options: {
      parseFrontmatter: true,
    },
  })

  return (
    <Container>
      <div className="flex flex-col items-center">
        <h1 className="font-stretch-expanded mt-12 mb-4 text-center text-3xl font-medium text-brand-500 sm:text-4xl">
          {frontmatter.title}
        </h1>
        <h2 className="mb-4 text-xl text-gray-500">{frontmatter.author}</h2>
        <Stars n={frontmatter.stars || 0} className="mb-8 text-xl" />
      </div>
      <div className="mb-12 block border-y border-gray-100 pt-3 text-sm sm:flex">
        <div className="mb-2 flex items-center text-gray-500">
          <Tag className="mr-1 h-4 w-4" />
          <p>Tagged:</p>
          {frontmatter.tags?.split(',').map((tag: string, idx: number) => (
            <a
              key={idx}
              className="ml-2 rounded-lg bg-gray-100 px-2 py-1 font-mono text-xs font-medium uppercase text-fg hover:text-blue-500"
            >
              {tag}
            </a>
          ))}
        </div>
        <div className="mb-3 ml-auto flex items-center text-gray-500">
          <Calendar className="mr-1 h-4 w-4" />
          <p>
            Finished: <span className="text-fg">{frontmatter.written}</span>
          </p>
        </div>
      </div>
      <article className="font-serif text-lg font-light">{content}</article>
    </Container>
  )
}

// Populate all known slugs
// TODO: Make this into a function that can be called from anywhere
export async function generateStaticParams() {
  let p = path.join(process.cwd(), 'posts', 'reading')
  const allFilenames = await readdir(p)
  const fileNames = allFilenames.filter(
    (fname) => fname.split('.').pop() == 'mdx'
  )

  return fileNames.map((fname) => ({
    slug: fname.replace(/\.mdx/, ''),
  }))
}
