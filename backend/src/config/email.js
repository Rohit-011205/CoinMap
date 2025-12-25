import nodemailer from 'nodemailer';
import 'dotenv/config' 

export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerficationemail = async (email, code, username) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '✉️ CoinCollect - Email Verification Code',
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

  return mailer.sendMail(mailOptions);
};
