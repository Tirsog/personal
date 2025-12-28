import { useState } from "react"
import styles from "./Contact.module.css"

export default function ContactForm() {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [emailError, setEmailError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState("") // 'success' or 'error'
    const [submitMessage, setSubmitMessage] = useState("")

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)

        if (value && !validateEmail(value)) {
            setEmailError("Please enter a valid email address")
        } else {
            setEmailError("")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address")
            return
        }

        setIsSubmitting(true)
        setSubmitStatus("")
        setSubmitMessage("")

        try {
            const res = await fetch("/api/resend", {
                body: JSON.stringify({
                    email: email,
                    fullname: fullname,
                    subject: "Contact Form Message",
                    message: message,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            })

            const data = await res.json()

            if (!res.ok || data.error) {
                setSubmitStatus("error")
                setSubmitMessage(data.error || "Failed to send message. Please check your SendGrid configuration.")
                setIsSubmitting(false)
                return
            }

            setSubmitStatus("success")
            setSubmitMessage("Message sent successfully!")
            setFullname("")
            setEmail("")
            setMessage("")
            setIsSubmitting(false)

            // Clear success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus("")
                setSubmitMessage("")
            }, 5000)
        } catch (error) {
            console.error("Contact form error:", error)
            setSubmitStatus("error")
            setSubmitMessage("Failed to send message. Please try again later.")
            setIsSubmitting(false)
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        value={fullname}
                        onChange={(e) => {
                            setFullname(e.target.value)
                        }}
                        name="fullname"
                        id="fullname"
                        placeholder="Name"
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Email"
                        required
                        className={`${styles.input} ${
                            emailError ? styles.inputError : ""
                        }`}
                    />
                    {emailError && (
                        <span className={styles.errorText}>{emailError}</span>
                    )}
                </div>

                <div className={styles.inputGroupFull}>
                    <textarea
                        name="message"
                        id="message"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                        placeholder="Your Message"
                        required
                        className={styles.textarea}
                    ></textarea>
                </div>

                <div className={styles.buttonContainer}>
                    <button
                        type="submit"
                        disabled={isSubmitting || !!emailError}
                        className={styles.button}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </div>

                {submitMessage && (
                    <div
                        className={`${styles.submitMessage} ${
                            submitStatus === "success"
                                ? styles.submitSuccess
                                : styles.submitError
                        }`}
                    >
                        {submitMessage}
                    </div>
                )}
            </form>
        </div>
    )
}
