import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import clsx from 'clsx'
import { MDXProvider } from '@mdx-js/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import PageHead from '../../components/page-head/page-head'
import Container from '../../components/container/container'
import Layout from '../../components/layout/layout'
import MailIcon from '../../public/icons/mail.svg'
import GithubIcon from '../../public/icons/github.svg'
import { HTMLProps } from 'react'

const H3List = (props: HTMLProps<HTMLHeadingElement>) => {
  return (
    <h3
      {...props}
      className={clsx(
        'py-1 text-2xl font-medium tracking-tight text-fg',
        'before:about-list-cntr [counter-increment:list] before:text-blue first:[counter-reset:list_1]'
      )}
    >
      {props.children}
    </h3>
  )
}

const components = {
  h1: (props: HTMLProps<HTMLHeadingElement>) => (
    <h1
      {...props}
      className={clsx(
        'mt-24 border-t-2 border-t-fg py-6 text-4xl font-medium tracking-tight text-fg first-of-type:mt-0',
        'before:about-sec-cntr [counter-increment:section] before:text-blue first:[counter-reset:section]'
      )}
    />
  ),
  h2: (props: HTMLProps<HTMLHeadingElement>) => (
    <h2
      {...props}
      className={clsx(
        'mt-12 border-t border-t-pink-light pt-3 pb-6 text-3xl font-medium tracking-tight text-fg',
        'before:about-subsec-cntr [counter-increment:subsection] before:text-blue first:[counter-reset:subsection_1]'
      )}
    />
  ),
  h3: (props: HTMLProps<HTMLHeadingElement>) => <H3List {...props} />,
  p: (props: HTMLProps<HTMLParagraphElement>) => (
    <p {...props} className="mb-4 max-w-2xl text-lg tracking-tight text-gray" />
  ),
  strong: (props: HTMLProps<HTMLElement>) => (
    <strong {...props} className="font-medium text-fg" />
  ),
  li: (props: HTMLProps<HTMLLIElement>) => (
    <li {...props} className="mb-1 text-lg tracking-tight text-gray" />
  ),
}

type AboutProps = {
  source: MDXRemoteSerializeResult
}

export default function Me({ source }: AboutProps) {
  return (
    <div className="overflow-hidden">
      <Layout>
        <PageHead title={'About | Jacob Keisling'} />
        <Container>
          <h1 className="my-6 max-w-3xl text-5xl font-medium tracking-tight text-gray">
            <span className="text-blue">Hi! I'm Jacob Keisling.</span> I make
            websites, <span className="italic">inter alia</span>.
          </h1>
          <div className="mt-12 flex flex-wrap items-end gap-x-12 font-mono text-gray">
            <div className="mb-[-0.5rem] hidden sm:block">
              <Image
                src="/images/me.png"
                alt="That's me, Jacob"
                height="128px"
                width="128px"
              />
            </div>
            <a
              className="mb-2 flex items-center underline-offset-4 hover:underline"
              href="mailto:enquiries@keisling.me"
            >
              <MailIcon className="mr-1 inline" />
              enquiries@keisling.me
            </a>
            <a
              className="flex items-center pb-2 underline-offset-4 hover:underline"
              href="https://github.com/EndlessReform/"
            >
              <GithubIcon className="mr-1 inline" />
              endlessreform
            </a>
          </div>
          <div>
            <MDXProvider components={components}>
              <MDXRemote {...source} />
            </MDXProvider>
          </div>
        </Container>
      </Layout>
    </div>
  )
}

export const getStaticProps = async () => {
  const fullPath = path.join(process.cwd(), 'posts', 'about', `me.mdx`)
  const source = fs.readFileSync(fullPath, 'utf-8')
  const mdxSource = await serialize(source, { parseFrontmatter: true })
  return { props: { source: mdxSource } }
}
