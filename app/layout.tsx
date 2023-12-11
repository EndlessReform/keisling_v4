import clsx from 'clsx'
import { Newsreader } from 'next/font/google'
import localFont from 'next/font/local'

import { Header, Footer } from '../components'
import './globals.css'

const mona = localFont({
  src: './Mona-Sans.woff2',
  display: 'swap',
  weight: '100 900',
  declarations: [
    {
      prop: 'font-stretch',
      value: '75% 125%',
    },
  ],
  variable: '--font-mona',
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
    <html lang="en" className={`${newsreader.variable} ${mona.variable}`}>
      <body className={clsx('mx-auto min-h-screen overflow-x-hidden bg-bg')}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default Layout
