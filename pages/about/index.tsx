import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Image from 'next/image'
import clsx from 'clsx'
import { MDXProvider } from '@mdx-js/react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

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
        'py-1 text-xl font-medium tracking-tight text-fg',
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
        'mt-24 border-t-2 border-t-fg py-6 text-3xl font-medium tracking-tight text-fg first-of-type:mt-0',
        'before:about-sec-cntr [counter-increment:section] before:text-blue first:[counter-reset:section]'
      )}
    />
  ),
  h2: (props: HTMLProps<HTMLHeadingElement>) => (
    <h2
      {...props}
      className={clsx(
        'mt-12 border-t border-t-pink-light pt-3 pb-6 text-2xl font-medium tracking-tight text-fg',
        'before:about-subsec-cntr [counter-increment:subsection] before:text-blue first:[counter-reset:subsection_1]'
      )}
    />
  ),
  h3: (props: HTMLProps<HTMLHeadingElement>) => <H3List {...props} />,
  p: (props: HTMLProps<HTMLParagraphElement>) => (
    <p {...props} className="max-w-2xl mb-4 text-lg tracking-tight text-gray" />
  ),
  strong: (props: HTMLProps<HTMLElement>) => (
    <strong {...props} className="font-medium text-fg" />
  ),
  li: (props: HTMLProps<HTMLLIElement>) => (
    <li {...props} className="pl-2 mb-1 text-lg tracking-tight text-gray" />
  ),
}

type AboutProps = {
  source: MDXRemoteSerializeResult
}

export default function Me({ source }: AboutProps) {
  return (
    <div className="overflow-hidden">
      <Layout>
        <Head>
          <title>About | Jacob Keisling</title>
        </Head>
        <Container>
          <h1 className="max-w-3xl my-6 text-5xl font-medium tracking-tight text-gray">
            <span className="text-blue">Hi! 👋 I'm Jacob Keisling.</span> I make
            giant eggs for a living.
          </h1>
          <div className="flex items-end gap-12 mt-12 font-mono text-gray">
            <Image src="/images/me.png" height="128px" width="128px" />
            <a
              className="pb-2 underline-offset-4 hover:underline"
              href="mailto:enquiries@keisling.me"
            >
              <MailIcon className="inline mr-1" />
              enquiries@keisling.me
            </a>
            <a
              className="pb-2 underline-offset-4 hover:underline"
              href="https://github.com/EndlessReform/"
            >
              <GithubIcon className="inline mr-1" />
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
