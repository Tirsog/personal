import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Link from "next/link"

export default function Home() {
    return (
        <>
            <Head>
                <title>Tirso G. | Home</title>
                <meta name="description" content="Tirso's Personal page" />
                <meta
                    name="keywords"
                    content="product management, proyect management, trademarks, marketing"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="pagecontainer">
                <div className={styles.aboutme}>
                    <div>
                        <h1>About Me</h1>
                        <p>
                            Con experiencia como ecommerce manager. Proyect
                            manager y SEO
                        </p>
                        <p>
                            Project Manager{" "}
                            <Link href="https://igerent.com">@iGERENT</Link>
                        </p>
                        <Link href="/contact">
                            <button>Contact Me</button>
                        </Link>
                    </div>
                    <div className={styles.image}>
                        <Image
                            src="/images/tirso.png"
                            width={300}
                            height={170}
                            alt="Tirso Garcia"
                        />
                    </div>
                </div>
                {/*  */}
                <div className={styles.article}>
                    <h2>Latest Article</h2>
                    <div>
                        <Image
                            src="/images/posts/signing-man.png"
                            width={200}
                            height={200}
                            alt="Tirso Garcia"
                        />
                        <p>
                            Steps to access allow a docker container to access
                            stuff on the host.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
