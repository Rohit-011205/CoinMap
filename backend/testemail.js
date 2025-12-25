import { mailer } from './src/config/email.js';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  try {
    const info = await mailer.sendMail({
      from: process.env.EMAIL_USER,
      to: 'your_test_email@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email'
    });
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Email error:', err);
  }
})();
