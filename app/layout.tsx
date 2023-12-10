import clsx from 'clsx'
import { Newsreader } from 'next/font/google'

import { Header, Footer } from '../components'
import './globals.css'

const newsreader = Newsreader({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  subsets: ['latin-ext'],
  display: 'swap',
  adjustFontFallback: false,
})

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={clsx(
        'mx-auto min-h-screen overflow-hidden bg-bg',
        newsreader.variable
      )}
    >
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
