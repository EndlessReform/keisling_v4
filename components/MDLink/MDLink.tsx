import Link from 'next/link'
import React from 'react'

// Assets
import { ArrowUpRight, Launch } from '@carbon/icons-react'

export function MDLink(props: React.HTMLProps<HTMLAnchorElement>) {
  return (
    <>
      {
        // Why are styles duplicated? DRY only applies when R>=3
        props.href !== undefined ? (
          props.href[0] === '/' ? (
            <Link
              href={props.href}
              className="inline-flex items-center text-green hover:underline hover:underline-offset-2"
            >
              {props.children}
              <ArrowUpRight className="ml-0.5 mt-1 h-[9px] w-[10px]" />
            </Link>
          ) : (
            <a
              {...props}
              className="text-blue inline-flex items-center hover:underline hover:underline-offset-2"
            >
              {props.children}
              <Launch className="ml-1 mt-0.5 h-[10px] w-[10px]" />
            </a>
          )
        ) : (
          <></>
        )
      }
    </>
  )
}
