import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (str) =>
    str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")

async function sendEmail(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST")
        return res.status(405).json({ error: "Method not allowed" })
    }

    const { fullname, email, message } = req.body || {}

    const isValid =
        typeof fullname === "string" &&
        fullname.trim().length > 0 &&
        fullname.length <= 200 &&
        typeof email === "string" &&
        email.length <= 320 &&
        EMAIL_REGEX.test(email) &&
        typeof message === "string" &&
        message.trim().length > 0 &&
        message.length <= 5000

    if (!isValid) {
        return res.status(400).json({ error: "Missing or invalid form fields" })
    }

    const safeName = escapeHtml(fullname.trim())
    const safeEmail = escapeHtml(email.trim())
    const safeMessage = escapeHtml(message.trim()).replace(/\r?\n/g, "<br>")

    try {
        const { error } = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: "hi@tirsog.es",
            replyTo: email.trim(),
            subject: `Contact Form: ${fullname.trim().replace(/[\r\n]+/g, " ")}`,
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Tirsog.es Contact Form</title>
        <meta name="description" content="Tirsog.es Contact Form">
        <meta name="author" content="Tirso G.">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      </head>
      <body>
      <h2>New Contact Form Submission:</h2>
        <b>From: </b><p>${safeName}</p>
        <b>Email: </b><p>${safeEmail}</p>
        <b>Message:</b><br><p>${safeMessage}</p>
      </body>
      </html>`,
        })

        if (error) {
            return res.status(400).json({ error: error.message })
        }

        return res.status(200).json({ error: "" })
    } catch (error) {
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message })
    }
}

export default sendEmail
