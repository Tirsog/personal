import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendEmail(req, res) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: "hi@tirsog.es",
            subject: `Contact Form: ${req.body.subject}`,
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
        <b>From: </b><p>${req.body.fullname}</p>
        <b>Email: </b><p>${req.body.email}</p>
        <b>Message:</b><br><p>${req.body.message}</p>
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
