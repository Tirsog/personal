import sendgrid from "@sendgrid/mail"

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(req, res) {
    try {
        // console.log("REQ.BODY", req.body);
        await sendgrid.send({
            to: "hi@tirsog.es", // Your email where you'll receive emails
            from: "hi@tirsog.es", // your website email address here
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
    } catch (error) {
        // console.log(error);
        return res
            .status(error.statusCode || 500)
            .json({ error: error.message })
    }

    return res.status(200).json({ error: "" })
}

export default sendEmail
