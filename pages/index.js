import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Index.module.css"
import Link from "next/link"
import ContactForm from "../components/contactForm/ContactForm"

export default function Home({ posts }) {
    return (
        <>
            <Head>
                <title>Tirso G.</title>
                <meta name="description" content="Tirso's Personal page" />
                <meta
                    name="keywords"
                    content="product management, proyect management, trademarks, marketing"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.sectionInner}>
                        <h1 className={styles.title}>Tirso's Stuff</h1>
                        <p className={styles.description}>
                            <Link className={styles.link} href="/bees">
                                Go to Bees
                            </Link>
                        </p>
                        <p className={styles.description}>
                            <Link className={styles.link} href="/articles">
                                Go to Articles
                            </Link>
                        </p>
                    </div>
                </div>
                <div className={styles.section}>
                    <ContactForm />
                </div>
            </div>
        </>
    )
}
