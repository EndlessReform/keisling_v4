import Header from "../header/header";
import Footer from "../footer/footer";

const Layout: React.FC = ({ children }) => {
    return(
        <div className="min-h-screen mx-auto bg-bg">
            <Header />
            { children }
            <Footer />
        </div>
    )
}

export default Layout