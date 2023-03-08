import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Link from "next/link"

export default function Home() {
    return (
        <>
            <Head>
                <title> Home | Tirso G.</title>
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
                        <h1 className="text-5xl font-bold pr-1">About Me</h1>
                        <p className="py-6">
                            Con experiencia como ecommerce manager. Proyect
                            manager y SEO. Project Manager. Con experiencia como
                            ecommerce manager. Proyect manager y SEO. Project
                            ManagerCon experiencia como ecommerce manager.
                            Proyect manager y SEO. Project Manager
                            <Link
                                className="underline"
                                href="https://igerent.com"
                            >
                                @iGERENT
                            </Link>
                        </p>
                        <div className="flex justify-center">
                            <Link href="/contact">
                                <button className="text-white bg-mango border-0 py-2 px-7 focus:outline-none hover:underline rounded text-2xl font-semibold">
                                    Contact Me
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full">
                        <Image
                            className="rounded"
                            src="/images/tirso-watercolor.png"
                            width={900}
                            height={450}
                            alt="Tirso Garcia watercolour"
                        />
                    </div>
                </div>
                <div className="mx-auto flex flex-col-reverse md:max-w-7xl md:flex-row p-4 gap-5 py-12">
                    <p></p>
                </div>
            </div>
        </>
    )
}
