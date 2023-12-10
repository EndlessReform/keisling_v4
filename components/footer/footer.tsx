import Image from 'next/image'
import { Logo } from '../Logo'

import Container from '../container/container'

export const Footer = () => {
  return (
    <Container>
      <footer className="border-gray flex items-center border-t pt-3 pb-16 text-xs text-gray-400">
        <div className="mr-3 h-6 w-6">
          <Logo className="h-auto w-auto text-gray-800" />
        </div>
        <p>© Jacob Keisling</p>
        <div className="ml-auto">
          <a
            className="flex items-center justify-center gap-2"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <Image src="/vercel.svg" alt="Vercel Logo" width="72" height="16" />
          </a>
        </div>
      </footer>
    </Container>
  )
}
