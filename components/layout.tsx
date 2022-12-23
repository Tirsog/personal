import Navbar from "./navbar/navbar"
import Footer from "./footer/footer"

export default function Layout({ children }: any) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
