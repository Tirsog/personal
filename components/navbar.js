import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import styles from "../styles/Navbar.module.css"

export default function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image
                    src="/images/icon.png"
                    alt="Tirso full logo"
                    width={137}
                    height={50}
                />
            </Link>
            <div>
                <div className={isNavExpanded ? "hide" : "display"}>
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
                <div
                    className={`${styles.ul} ${
                        isNavExpanded ? styles.display : styles.hide
                    }`}
                >
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
                    <Link href={"/"}>Home</Link>
                </li>
                <li className={styles.li}>
                    <Link href={"/projects"}>Projects</Link>
                </li>
                <li className={styles.li}>
                    <Link href={"/articles"}>Articles</Link>
                </li>
                <li className={styles.li}>
                    <Link href={"/contact"}>Contact</Link>
                </li>
            </ul>
        </nav>
    )
}
