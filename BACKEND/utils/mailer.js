import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    family: 4,
    rejectUnauthorized: false,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

export default async function sendOTPEmail(email, otp) {
  console.log("STEP 1");

  try {
    console.log("STEP 2");

    const info = await transporter.sendMail({
      from: `"EsecGPT Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset</h2>
        <h1>${otp}</h1>
        <p>This OTP expires in 10 minutes.</p>
      `,
    });

    console.log("STEP 3");
    console.log(info);
    return info;
  } catch (err) {
    console.log("STEP ERROR");
    console.error(err);
    throw err;
  }
}