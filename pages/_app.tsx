import { MDXProvider } from '@mdx-js/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Shortcode components
import MDLink from '../components/MDLink/MDLink'
import { HTMLProps } from 'react'

const components = {
  h1: (props: any) => <h1 {...props} className="mb-4 text-4xl font-medium tracking-tight"/>,
  h2: (props: any) => <h2 {...props} className="mt-6 mb-3 text-3xl font-medium tracking-tight"/>,
  h3: (props: any) => <h3 {...props} className="mt-6 mb-3 text-2xl font-medium"/>,
  p: (props: any) => <p {...props} className="mb-3 tracking-[-.0075em]"/>,
  a: (props: any) => <MDLink {...props}/>,
  ul: (props: HTMLProps<HTMLUListElement>) => <ul {...props} className="m-md-ul mx-3 marker:text-gray marker:font-bold marker:font-mono marker:content-['⟶'] marker:pr-2"/>,
  ol: (props: HTMLProps<HTMLOListElement>) => <ol {...props} className="list-[decimal-leading-zero] list-inside ml-[-6px] marker:text-gray" />,
  li: (props: HTMLProps<HTMLLIElement>) => <li {...props} className="pl-2" />,
  strong: (props: any) => <strong {...props} className="font-medium"/>,
  blockquote: (props: any) => <blockquote {...props} className="pt-3 pl-3 m-4 border border-l-4 border-gray"/>,
  code: (props: any) => <code {...props} className="p-1 text-xs rounded bg-pink-light" />
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default MyApp
