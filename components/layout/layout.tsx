import { Header } from '../Header'
import { Footer } from '../Footer/'
import clsx from 'clsx'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
