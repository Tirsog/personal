import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import styles from "../styles/Navbar.module.css"

export default function Navbar() {
    const { asPath } = useRouter()
    const [isNavExpanded, setIsNavExpanded] = useState(false)

    return (
        <nav className={styles.nav}>
            <div className={styles.logotitle}>
                <Link href="/">
                    <Image
                        src="/images/icon.png"
                        alt="Logo Tirso Full"
                        width={137}
                        height={50}
                    />
                </Link>
            </div>
            <div>
                <div className={isNavExpanded ? styles.hide : styles.display}>
                    <button
                        className={styles.icon}
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className={isNavExpanded ? styles.display : styles.hide}>
                    <button
                        className={styles.icon}
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <ul
                className={`${styles.ul} ${
                    isNavExpanded ? styles.display : styles.hide
                }`}
            >
                <li className={styles.li}>
                    <Link
                        onClick={() => {
                            setIsNavExpanded(false)
                        }}
                        href={"/"}
                        className={asPath == "/" ? styles.activelink : ""}
                    >
                        Home
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link
                        onClick={() => {
                            setIsNavExpanded(false)
                        }}
                        href={"/projects"}
                        className={
                            asPath == "/projects" ? styles.activelink : ""
                        }
                    >
                        Projects
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link
                        onClick={() => {
                            setIsNavExpanded(false)
                        }}
                        href={"/articles"}
                        className={
                            asPath == "/articles" ? styles.activelink : ""
                        }
                    >
                        Articles
                    </Link>
                </li>
                <li className={styles.li}>
                    <Link
                        onClick={() => {
                            setIsNavExpanded(false)
                        }}
                        href={"/contact"}
                        className={
                            asPath == "/contact" ? styles.activelink : ""
                        }
                    >
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
