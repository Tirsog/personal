import Link from "next/link"
import styles from "./Navbar.module.css"

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    @tirsog
                </Link>
                <div className={styles.links}>
                    <Link href="/" className={styles.link}>
                        Home
                    </Link>
                    <Link href="/projects" className={styles.link}>
                        Projects
                    </Link>
                    <Link href="/contact" className={styles.link}>
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    )
}
