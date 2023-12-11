import type { MDXComponents } from 'mdx/types'
import clsx from 'clsx'
import { HTMLProps } from 'react'

const H3List = (props: HTMLProps<HTMLHeadingElement>) => {
  return (
    <h3
      {...props}
      className={clsx(
        'py-1 text-2xl font-medium tracking-tight text-fg',
        'before:about-list-cntr before:text-blue [counter-increment:list] first:[counter-reset:list_1]'
      )}
    >
      {props.children}
    </h3>
  )
}

const component_overrides = {
  h1: (props: HTMLProps<HTMLHeadingElement>) => (
    <h1
      {...props}
      className={clsx(
        'mt-24 border-t-2 border-t-gray-500 py-6 text-3xl font-medium tracking-tight text-fg first-of-type:mt-0',
        'before:about-sec-cntr before:text-blue [counter-increment:section] first:[counter-reset:section]'
      )}
    />
  ),
  h2: (props: HTMLProps<HTMLHeadingElement>) => (
    <h2
      {...props}
      className={clsx(
        'mt-12 border-t border-t-gray-100 pt-3 pb-6 text-2xl font-medium tracking-tight text-fg',
        'before:about-subsec-cntr [counter-increment:subsection] before:text-blue-600 first:[counter-reset:subsection_1]'
      )}
    />
  ),
  h3: (props: HTMLProps<HTMLHeadingElement>) => <H3List {...props} />,
  p: (props: HTMLProps<HTMLParagraphElement>) => (
    <p {...props} className="mb-4 max-w-2xl text-lg text-gray-500" />
  ),
  strong: (props: HTMLProps<HTMLElement>) => (
    <strong {...props} className="font-medium text-fg" />
  ),
  li: (props: HTMLProps<HTMLLIElement>) => (
    <li {...props} className="mb-1 text-lg tracking-tight text-gray-500" />
  ),
  a: (props: HTMLProps<HTMLAnchorElement>) => (
    <a {...props} className="text-blue-600 hover:text-blue-700" />
  ),
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...component_overrides,
    ...components,
  }
}
