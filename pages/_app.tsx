import { MDXProvider } from '@mdx-js/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Shortcode components
import MDLink from '../components/MDLink/MDLink'
import { HTMLProps } from 'react'

const components = {
  h1: (props: HTMLProps<HTMLHeadingElement>) => (
    <h1
      {...props}
      className="mt-10 mb-4 text-4xl font-medium tracking-tight first-of-type:mt-0"
    />
  ),
  h2: (props: HTMLProps<HTMLHeadingElement>) => (
    <h2 {...props} className="mt-6 mb-3 text-3xl font-medium tracking-tight" />
  ),
  h3: (props: HTMLProps<HTMLHeadingElement>) => (
    <h3 {...props} className="mt-6 mb-3 text-2xl font-medium" />
  ),
  p: (props: HTMLProps<HTMLParagraphElement>) => (
    <p {...props} className="mb-3 tracking-[-.0075em]" />
  ),
  a: (props: HTMLProps<HTMLAnchorElement>) => <MDLink {...props} />,
  ul: (props: HTMLProps<HTMLUListElement>) => (
    <ul
      {...props}
      className="m-md-ul mx-4 marker:ml-2 marker:pr-2 marker:text-gray marker:content-['🡪']"
    />
  ),
  ol: (props: HTMLProps<HTMLOListElement>) => (
    <ol
      {...props}
      className="ml-[-6px] list-inside list-[decimal-leading-zero] marker:text-gray"
    />
  ),
  li: (props: HTMLProps<HTMLLIElement>) => (
    <li {...props} className="pl-2 last-of-type:mb-4" />
  ),
  strong: (props: HTMLProps<HTMLElement>) => (
    <strong {...props} className="font-medium" />
  ),
  blockquote: (props: HTMLProps<HTMLElement>) => (
    <blockquote
      {...props}
      className="pt-3 pl-3 m-4 border border-l-4 border-gray"
    />
  ),
  code: (props: HTMLProps<HTMLElement>) => (
    <code {...props} className="p-1 text-xs rounded bg-pink-light" />
  ),
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default MyApp
