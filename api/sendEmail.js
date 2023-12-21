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
      const statusCode = error.code === 'SMTP_CONNECT_FAILED' ? 500 : 503;
      res.status(statusCode).send('Error sending email');
    }
  });
  