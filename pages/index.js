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
            <div className="mx-auto flex bg-red-400 p-2">
                <div>
                    <h1 className="text-5xl font-bold pr-1">About Me</h1>
                    <p className="py-6">
                        Con experiencia como ecommerce manager. Proyect manager
                        y SEO. Project Manager
                        <Link className="underline" href="https://igerent.com">
                            @iGERENT
                        </Link>
                    </p>
                    <Link href="/contact">
                        <button className="text-white bg-mango border-0 py-1 px-6 focus:outline-none hover:bg-carolinaBlue rounded text-lg mt-10 sm:mt-0">
                            Contact Me
                        </button>
                    </Link>
                </div>
                <Image
                    className="rounded"
                    src="/images/tirso.png"
                    width={450}
                    height={170}
                    alt="Tirso G."
                />
            </div>

            <div className="bg-blue-300 max-w-xl mg-auto">
                <h2>Latest Article</h2>
                <div>
                    <Image
                        src="/images/posts/signing-man.png"
                        width={200}
                        height={200}
                        alt="Tirso Garcia"
                    />
                    <p>
                        Steps to access allow a docker container to access stuff
                        on the host.
                    </p>
                </div>
            </div>
        </>
    )
}
