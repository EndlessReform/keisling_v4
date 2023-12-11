import Image from 'next/image'
import type { Metadata } from 'next'

import Container from '../../components/container/container'

import { LogoGithub, SendAlt } from '@carbon/icons-react'

type AboutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'About · Jacob Keisling',
}

export default function AboutLayout({ children }: AboutProps) {
  return (
    <Container>
      <h1 className="text-gray font-stretch-expanded my-6 max-w-3xl text-4xl font-extralight leading-none">
        <span className="font-medium text-brand-500">
          Hi! I'm Jacob Keisling.
        </span>
        <br /> I make websites, <span className="italic">inter alia</span>.
      </h1>
      <div className="mt-8 flex flex-wrap items-end gap-x-12 font-mono font-light text-gray-500">
        <Image
          src="/images/me.png"
          alt="That's me, Jacob"
          height="128"
          width="128"
        />
        <a
          className="mb-2 flex items-center underline-offset-4 hover:underline"
          href="mailto:enquiries@keisling.me"
        >
          <SendAlt className="mr-1.5 inline" />
          enquiries@keisling.me
        </a>
        <a
          className="flex items-center pb-2 underline-offset-4 hover:underline"
          href="https://github.com/EndlessReform/"
        >
          <LogoGithub className="mr-1.5 inline" />
          endlessreform
        </a>
      </div>
      <div>{children}</div>
    </Container>
  )
}
