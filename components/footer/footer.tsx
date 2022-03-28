import Image from 'next/image'
import Logo from '../../public/logos/logo.svg'

import Container from '../container/container'

const Footer = () => {
  return (
    <Container>
      <footer className="flex items-center pt-3 pb-16 text-xs border-t border-gray text-gray">
        <div className="w-6 h-6 mr-3">
          <Logo className="w-auto h-auto" />
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
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </a>
        </div>
      </footer>
    </Container>
  )
}

export default Footer
