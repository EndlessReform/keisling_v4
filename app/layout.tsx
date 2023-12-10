import { Header, Footer } from '../components'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto min-h-screen overflow-hidden bg-bg">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
