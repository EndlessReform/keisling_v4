import Header from "../header/header"
import Footer from "../footer/footer"
import Container from "../container/container"

const MDXLayout: React.FC = ({ children }) => {
    return(
        <div className="w-full min-h-screen bg-bg text-fg">
            <Header />
            <Container>
                {children}
            </Container>
            <Footer />
        </div>
    )
}

export default MDXLayout