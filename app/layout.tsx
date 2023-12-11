import clsx from 'clsx'
import { IBM_Plex_Mono, Newsreader } from 'next/font/google'
import localFont from 'next/font/local'

import { Header, Footer } from '../components'
import './globals.css'

const mona = localFont({
  src: [
    {
      path: './Mona-Sans.woff2',
    },
    {
      path: './Mona-Sans.woff2',
      style: 'italic',
    },
  ],
  display: 'swap',
  weight: 'variable',
  declarations: [
    {
      prop: 'font-stretch',
      value: '75% 125%',
    },
  ],
  variable: '--font-mona',
})

const plex_mono = IBM_Plex_Mono({
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-plex-mono',
  subsets: ['latin-ext'],
  /** Stupid workaround because of some bug; pulled from GH Issues */
  display: 'swap',
  adjustFontFallback: false,
})

const newsreader = Newsreader({
  weight: ['200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  subsets: ['latin-ext'],
  display: 'swap',
  adjustFontFallback: false,
})

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${mona.variable} ${plex_mono.variable}`}
    >
      <body className={clsx('mx-auto min-h-screen overflow-x-hidden bg-bg')}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default Layout
