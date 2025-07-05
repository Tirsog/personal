import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Link from "next/link"

export default function Home() {
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
            <div className="justify-center flex flex-col">
                <div className="mx-auto flex flex-col-reverse md:max-w-7xl md:flex-row p-4 gap-5 py-12">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-5xl font-bold pr-1">
                            Nothing to see here
                        </h1>
                        <p className="py-6">
                            <Link className="underline" href="/bees">
                                Go to Bees
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="mx-auto flex flex-col-reverse md:max-w-7xl md:flex-row p-4 gap-5 py-12">
                    <p></p>
                </div>
            </div>
        </>
    )
}
