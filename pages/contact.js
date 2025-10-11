import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Contact.module.css"
import { useState } from "react"

export default function Contact() {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        /*      let isValidForm = handleValidation() */

        const res = await fetch("/api/sendgrid", {
            body: JSON.stringify({
                email: email,
                fullname: fullname,
                subject: subject,
                message: message,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })

        const { error } = await res.json()
        if (error) {
            console.log(error)
            return
        }
        console.log(fullname, email, subject, message)
    }

    return (
        <div>
            <Head>
                <title>Contact me! | Tirso G.</title>
                <meta name="description" content="Contact page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Inicio Form Sendgrid */}

            <h1 className={styles.title}>
                Send me a message
            </h1>
            <form
                onSubmit={handleSubmit}
                className={styles.form}
            >
                <label
                    htmlFor="fullname"
                    className={styles.label}
                >
                    Full name{" "}
                    <span className={styles.labelRequired}>*</span>
                </label>
                <input
                    type="text"
                    value={fullname}
                    onChange={(e) => {
                        setFullname(e.target.value)
                    }}
                    name="fullname"
                    className={styles.input}
                />

                <label
                    htmlFor="email"
                    className={styles.label}
                >
                    E-mail <span className={styles.labelRequired}>*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    className={styles.input}
                />

                <label
                    htmlFor="subject"
                    className={styles.label}
                >
                    Subject <span className={styles.labelRequired}>*</span>
                </label>
                <input
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value)
                    }}
                    className={styles.input}
                />

                <label
                    htmlFor="message"
                    className={styles.label}
                >
                    Message <span className={styles.labelRequired}>*</span>
                </label>
                <textarea
                    name="message"
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                    className={styles.textarea}
                ></textarea>

                <div className={styles.buttonContainer}>
                    <button
                        type="submit"
                        className={styles.button}
                    >
                        Submit
                        {/*                         <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="text-cyan-500 ml-2"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
                                fill="currentColor"
                            />
                        </svg> */}
                    </button>
                </div>
            </form>

            {/* Fin Form Sendgrid */}
            {/* 
            <div className="flex flex-col mx-auto w-96 py-10">
                <h1 className="py-6 text-3xl font-bold flex justify-center">
                    Contact me
                </h1>
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
            </div>*/}
        </div>
    )
}
