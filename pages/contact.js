import Head from "next/head"
import ContactForm from "../components/contactForm/ContactForm"
import styles from "../styles/Contact.module.css"

export default function Contact() {
    return (
        <>
            <Head>
                <title>Contact - Tirso G.</title>
                <meta name="description" content="Get in touch with Tirso" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Get in Touch</h1>
                    <p className={styles.description}>
                        Have a question or want to work together? Feel free to
                        reach out.
                    </p>
                    <ContactForm />
                </div>
            </div>
        </>
    )
}
