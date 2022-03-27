import { GetStaticProps, InferGetStaticPropsType } from 'next'
import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

// Components
import Head from 'next/head'
import MDXLayout from '../../components/mdx_layout/mdx_layout'
import Stars from '../../components/stars/stars'

// Assets
import TagIcon from '../../public/icons/tag.svg'
import CalendarIcon from '../../public/icons/calendar.svg'

export default function BookReview({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Review: {source.frontmatter.title}</title>
      </Head>
      <MDXLayout>
        <div className="flex flex-col items-center">
          <h1 className="mt-16 mb-4 text-4xl font-medium tracking-tight text-center text-red sm:text-5xl">
            {source.frontmatter.title}
          </h1>
          <Stars n={source.frontmatter.stars} className="mb-8 text-xl" />
        </div>
        <div className="block pt-3 mb-12 text-sm border-y border-pink-light sm:flex">
          <div className="flex items-center mb-2 text-gray">
            <TagIcon className="w-4 h-4 mr-1" />
            <p>Tagged:</p>
            {source.frontmatter.tags
              .split(',')
              .map((tag: string, idx: number) => (
                <a
                  key={idx}
                  className="px-2 py-1 ml-2 font-mono text-xs font-medium uppercase rounded-lg bg-pink-light text-fg hover:text-red"
                >
                  {tag}
                </a>
              ))}
          </div>
          <div className="flex items-center mb-3 ml-auto text-gray">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <p>
              Reviewed:{' '}
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
  let p = path.join(process.cwd(), 'posts', 'reading')
  const fileNames = fs
    .readdirSync(p)
    .filter((fname) => fname.split('.').pop() == 'mdx')
  let foo = fileNames.map((fname) => ({
    params: {
      slug: fname.replace(/\.mdx/, ''),
    },
  }))
  return {
    paths: foo,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // This will never be undefined...ugh
  const fullPath = path.join(
    process.cwd(),
    'posts',
    'reading',
    `${params.slug}.mdx`
  )
  const source = fs.readFileSync(fullPath, 'utf-8')
  const mdxSource = await serialize(source, { parseFrontmatter: true })
  return { props: { source: mdxSource } }
}
