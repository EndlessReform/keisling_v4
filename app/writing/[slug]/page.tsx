import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import { getSlugsFromFolder, WritingFrontmatter } from '../../../lib/get_posts'

import { Calendar, Tag as TagIcon } from '@carbon/icons-react'
import { articleShortcodes, Container, Tag } from '../../../components'
import { readFile } from 'fs/promises'

export default async function Article({
  params,
}: {
  params: { slug: string }
}) {
  const fullPath = path.join(
    process.cwd(),
    'posts',
    'writing',
    `${params?.slug}.mdx`
  )

  const source = await readFile(fullPath, 'utf-8')
  const { content, frontmatter } = await compileMDX<WritingFrontmatter>({
    source,
    components: { ...articleShortcodes },
    options: {
      parseFrontmatter: true,
    },
  })

  return (
    <Container>
      <div className="flex flex-col items-center">
        <h1 className="font-stretch-expanded mt-12 text-center text-3xl font-medium text-brand-500 sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 mb-12 max-w-lg text-center text-gray-500">
          {frontmatter.summary}
        </p>
      </div>
      <div className="mb-12 block border-y border-gray-100 pt-3 text-sm sm:flex">
        <div className="mb-2 flex items-center text-gray-500">
          <TagIcon className="mr-1 h-4 w-4" />
          <p className="mr-2">Tagged:</p>
          <div className="flex gap-2">
            {frontmatter.tags?.split(',').map((tag: string, idx: number) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className="mb-3 ml-auto flex items-center text-gray-500">
          <Calendar className="mr-1 h-4 w-4" />
          <p>
            Written: <span className="text-fg">{frontmatter.written}</span>
          </p>
        </div>
      </div>
      <article className="font-serif text-lg font-light">{content}</article>
    </Container>
  )
}

export async function generateStaticParams() {
  const slugs = await getSlugsFromFolder('writing')
  return slugs
}

/*
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // This will never be undefined...ugh
  const mdxSource = await serialize(source, { parseFrontmatter: true })
  return { props: { source: mdxSource } }
}
*/
