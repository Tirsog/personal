import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Contact page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="contactblock pagecontainer">
                <h2>Escríbeme</h2>
                <form name="contact" method="POST" data-netlify="true">
                    <label>
                        Nombre{" "}
                        <input type="text" name="name" placeholder="Nombre" />
                    </label>
                    <label>
                        Email:{" "}
                        <input type="email" name="email" placeholder="Email" />
                    </label>
                    <label>
                        Mensaje:
                        <textarea
                            name="message"
                            placeholder="Deja tu mensaje."
                        ></textarea>
                    </label>
                    <label>
                        Añadir Archivo: <input type="file" name="picture" />
                    </label>
                    <button type="submit" className="submit-button">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    )
}
