import Header from '../header/header'
import Footer from '../footer/footer'

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="min-h-screen mx-auto overflow-hidden bg-bg">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
