require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, planning, postcode, bill, consent } = req.body;
    if (!name || !email || !phone || !consent) return res.status(400).json({ error: 'Missing required fields' });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const toAddress = process.env.CONTACT_EMAIL;
    if (!toAddress) return res.status(500).json({ error: 'Server not configured with recipient email' });

    const message = {
      from: process.env.SMTP_FROM || 'no-reply@suncore.local',
      to: toAddress,
      subject: `New quote request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPlanning: ${planning}\nPostcode: ${postcode}\nBill: ${bill}\nConsent: ${consent}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Planning:</strong> ${planning}</p><p><strong>Postcode:</strong> ${postcode}</p><p><strong>Bill:</strong> ${bill}</p><p><strong>Consent:</strong> ${consent}</p>`
    };

    await transporter.sendMail(message);
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
