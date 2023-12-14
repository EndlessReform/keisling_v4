import Image from 'next/image'
import { Logo } from '../Logo'
import { LogoGithub } from '@carbon/icons-react'

import { Container } from '../Container'
import Link from 'next/link'

export const Footer = () => {
  return (
    <Container>
      <footer className="border-gray flex items-center border-t pt-3 pb-16 text-xs text-gray-400">
        <div className="mr-3 h-6 w-6">
          <Link href="/">
            <Logo className="h-6 w-6 hover:text-gray-500" />
          </Link>
        </div>
        <p>© Jacob Keisling {}</p>
        <a
          className="ml-auto flex items-center justify-center gap-2 hover:text-gray-500"
          href="https://github.com/endlessreform/site"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoGithub size={20} />
        </a>
      </footer>
    </Container>
  )
}
