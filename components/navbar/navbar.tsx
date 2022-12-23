import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

function Navbar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
        <nav>
            <Image
                src="/images/icon.png"
                alt="Tirso full logo"
                width={137}
                height={50}
            />
            <div id="mobile">
                <div className={isNavExpanded ? "hide" : "display"}>
                    <button
                        className="icon"
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                    >
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
                <div className={isNavExpanded ? "display" : "hide"}>
                    <button
                        className="icon"
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded)
                        }}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <ul className={isNavExpanded ? "display" : "hide"}>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/projects"}>Projects</Link>
                </li>
                <li>
                    <Link href={"/articles"}>Articles</Link>
                </li>
                <li className="welcome">
                    <Link href={"/contact"}>Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
