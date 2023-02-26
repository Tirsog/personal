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
            {/* https://www.netlify.com/blog/2020/05/26/add-a-netlify-powered-contact-form-to-your-next-js-site/ */}
            <div className="flex flex-col mx-auto w-96">
                <h2 className="py-6 text-3xl font-bold flex justify-center">
                    Contact me
                </h2>
                <form
                    className="flex flex-col mx-auto w-96 gap-2 py-2"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                >
                    <label>
                        <input
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            type="text"
                            name="name"
                            placeholder="Name"
                        />
                    </label>

                    <label>
                        <input
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                    </label>

                    <label>
                        <textarea
                            className="w-full bg-gray-100 bg-opacity-50  rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            name="message"
                            placeholder="Message"
                        ></textarea>
                    </label>

                    <button
                        className="text-white bg-mango py-1 px-6 rounded text-lg mt-10 sm:mt-0"
                        type="submit"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}
