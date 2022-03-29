import { GetStaticProps, InferGetStaticPropsType } from 'next'
import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { getPaths } from '../../lib/get_posts'

// Components
import MDXLayout from '../../components/mdx_layout/mdx_layout'

// Assets
import TagIcon from '../../public/icons/tag.svg'
import CalendarIcon from '../../public/icons/calendar.svg'
import PageHead from '../../components/page-head/page-head'

export default function BookReview({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageHead title={`${source.frontmatter.title} `} />
      <MDXLayout>
        <div className="flex flex-col items-center">
          <h1 className="mt-16 text-center text-4xl font-medium tracking-tight text-green sm:text-5xl">
            {source.frontmatter.title}
          </h1>
          <p className="my-8 max-w-lg text-center text-gray">
            {source.frontmatter.summary}
          </p>
        </div>
        <div className="mb-12 block border-y border-pink-light pt-3 text-sm sm:flex">
          <div className="mb-2 flex items-center text-gray">
            <TagIcon className="mr-1 h-4 w-4" />
            <p>Tagged:</p>
            {source.frontmatter.tags
              .split(',')
              .map((tag: string, idx: number) => (
                <a
                  key={idx}
                  className="ml-2 rounded-lg bg-pink-light px-2 py-1 font-mono text-xs font-medium uppercase text-fg hover:text-red"
                >
                  {tag}
                </a>
              ))}
          </div>
          <div className="mb-3 ml-auto flex items-center text-gray">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <p>
              Written:{' '}
              <span className="text-fg">{source.frontmatter.written}</span>
            </p>
          </div>
        </div>
        <MDXRemote {...source} />
      </MDXLayout>
    </>
  )
}

export async function getStaticPaths() {
  let paths = getPaths('writing')
  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // This will never be undefined...ugh
  const fullPath = path.join(
    process.cwd(),
    'posts',
    'writing',
    `${params?.slug}.mdx`
  )
  const source = fs.readFileSync(fullPath, 'utf-8')
  const mdxSource = await serialize(source, { parseFrontmatter: true })
  return { props: { source: mdxSource } }
}
