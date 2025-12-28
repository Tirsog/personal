import Navbar from "./navbar/Navbar"
import Footer from "./footer/Footer"
import styles from "./Layout.module.css"

export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}
