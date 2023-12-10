import { Header } from '../Header'
import Footer from '../footer/footer'
import Container from '../container/container'
import React from 'react'

const MDXLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-bg text-fg">
      <Header />
      <Container>{children}</Container>
      <Footer />
    </div>
  )
}

export default MDXLayout
