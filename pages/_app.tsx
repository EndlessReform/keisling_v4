import { MDXProvider } from '@mdx-js/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Shortcode components
import MDLink from '../components/MDLink/MDLink'
import { HTMLProps } from 'react'
import Image, { ImageProps } from 'next/image'

const components = {
  h1: (props: HTMLProps<HTMLHeadingElement>) => (
    <h1
      {...props}
      className="mt-10 mb-4 text-4xl font-medium tracking-tight first-of-type:mt-0"
    />
  ),
  h2: (props: HTMLProps<HTMLHeadingElement>) => (
    <h2 {...props} className="mt-8 mb-3 text-3xl font-medium tracking-tight" />
  ),
  h3: (props: HTMLProps<HTMLHeadingElement>) => (
    <h3 {...props} className="mt-8 mb-3 text-2xl font-medium" />
  ),
  p: (props: HTMLProps<HTMLParagraphElement>) => (
    <p {...props} className="mb-6 text-lg tracking-[-.0075em]" />
  ),
  a: (props: HTMLProps<HTMLAnchorElement>) => <MDLink {...props} />,
  ul: (props: HTMLProps<HTMLUListElement>) => (
    <ul
      {...props}
      className="m-md-ul mx-4 [list-style-image:_url('/icons/arrow-right-fixed-1rem.svg')] marker:ml-2 marker:text-gray"
    />
  ),
  ol: (props: any) => (
    // This should be HTMLProps<HTMLOListElement> but NO apparently that doesnt' work somehow
    <ol
      {...props}
      className="ml-[-6px] list-inside list-[decimal-leading-zero] marker:text-gray"
    />
  ),
  li: (props: HTMLProps<HTMLLIElement>) => (
    <li {...props} className="text-lg last-of-type:mb-4" />
  ),
  strong: (props: HTMLProps<HTMLElement>) => (
    <strong {...props} className="font-medium" />
  ),
  blockquote: (props: HTMLProps<HTMLElement>) => (
    <blockquote
      {...props}
      className="m-4 border border-l-4 border-gray pt-3 pl-3"
    />
  ),
  code: (props: HTMLProps<HTMLElement>) => (
    <code {...props} className="rounded bg-pink-light p-1 text-xs" />
  ),
  // Fuck this shit
  img: (props: any) => {
    if (props.src && props.src[0] === '/') {
      return (
        // Local images default to 4:3 resolution.
        // This is bad, but I should be using the Image element anyway so who cares
        <div className="my-6 max-w-2xl">
          <Image
            src={props.src}
            width="4000px"
            height="3000px"
            layout="responsive"
            className="rounded-2xl object-cover"
          />
        </div>
      )
    } else {
      return <img {...props} className="my-6 max-w-2xl rounded-2xl" />
    }
  },
  Image: (props: ImageProps) => (
    <div className="my-12 max-w-2xl">
      <Image
        {...props}
        className="rounded-2xl object-cover"
        layout="responsive"
      />
    </div>
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
