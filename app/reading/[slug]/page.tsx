import { Metadata } from 'next'
import { readFile } from 'fs/promises'
import { compileMDX } from 'next-mdx-remote/rsc'
import { Calendar, Tag as TagIcon } from '@carbon/icons-react'

import { articleShortcodes, Container, Stars, Tag } from '../../../components'
import {
  getSlugsFromFolder,
  makeFullPath,
  ReadingFrontmatter,
  makeMetadata,
} from '../../../lib/get_posts'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const metadata = await makeMetadata('reading', params.slug)
  return metadata
}

export default async function BookReview({
  params,
}: {
  params: { slug: string }
}) {
  // God, this is so stupid
  const fullPath = makeFullPath('reading', params.slug)
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
          <TagIcon className="mr-1 h-4 w-4" />
          <p>Tagged:</p>
          <div className="ml-2 flex gap-2">
            {frontmatter.tags?.split(',').map((tag: string, idx: number) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </div>
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
export async function generateStaticParams() {
  const slugs = await getSlugsFromFolder('reading')
  return slugs
}
