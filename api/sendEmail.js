const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.post('/api/sendEmail', async (req, res) => {
  const { name, email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  
    await transporter.sendMail({
      from: 'justinmguo0@gmail.com',
      to: email,
      subject: 'Form Submission',
      text: `Thank you for submitting the form with name: ${name}.`,
    });
  
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.code === 'SMTP_CONNECT_FAILED') {
      res.status(500).send('Error connecting to mail server');
    } else {
      res.status(500).send('Error sending email');
    }
  }
  
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
