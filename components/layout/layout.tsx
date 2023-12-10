import { Header } from '../Header'
import { Footer } from '../Footer/'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mx-auto min-h-screen overflow-hidden bg-bg">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
