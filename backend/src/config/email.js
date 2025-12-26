import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import 'dotenv/config'

// const resend = new Resend(process.env.RESEND_API_KEY); 

export const mailer = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 465,              
  secure: true,                 
  auth: { 
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerficationemail = async (email, code, username) => {
   const mailOptions = {
    from: `"CoinMap" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: '✉️ CoinMap - Email Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to CoinMap! 🎉</h2>
        <p style="font-size: 16px; color: #666;">Hi ${username},</p>
        <p style="font-size: 16px; color: #666;">
          Thank you for signing up! Use the code below to verify your email address.
        </p>
        <div style="margin: 30px 0; text-align: center;">
          <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px; display: inline-block;">
            <p style="font-size: 12px; color: #999; margin: 0 0 10px 0;">Verification Code</p>
            <p style="font-size: 36px; font-weight: bold; color: #007bff; letter-spacing: 5px; margin: 0;">
              ${code}
            </p>
          </div>
        </div>
        <p style="font-size: 14px; color: #666;">
          Enter this code in the verification screen to activate your account.
        </p>
        <p style="font-size: 12px; color: #999; margin-top: 30px;">
          * This code expires in 10 minutes.<br/>
          * Never share this code with anyone.<br/>
          If you didn't create this account, ignore this email.
        </p>
      </div>
    `,
  };
try {
    // This is the line that actually sends the email
    const info = await mailer.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow so your auth controller can catch it
  }
};
