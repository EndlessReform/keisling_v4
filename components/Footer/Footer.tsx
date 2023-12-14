import Image from 'next/image'
import { Logo } from '../Logo'
import { LogoGithub } from '@carbon/icons-react'

import { Container } from '../Container'

export const Footer = () => {
  return (
    <Container>
      <footer className="border-gray flex items-center border-t pt-3 pb-16 text-xs text-gray-400">
        <div className="mr-3 h-6 w-6">
          <Logo className="h-6 w-6 text-gray-400" />
        </div>
        <p>© Jacob Keisling {}</p>
        <div className="ml-auto">
          <a
            className="flex items-center justify-center gap-2"
            href="https://github.com/endlessreform/site"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LogoGithub size={20} />
          </a>
        </div>
      </footer>
    </Container>
  )
}
