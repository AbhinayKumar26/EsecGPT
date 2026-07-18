import nodemailer from "nodemailer";

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS EXISTS =", process.env.EMAIL_PASS ? "YES" : "NO");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((err) => {
  if (err) {
    console.log("❌ VERIFY ERROR:", err.message);
  } else {
    console.log("✅ Mailer Ready");
  }
});

const sendOTPEmail = async (email, otp) => {
  console.log("📧 Sending OTP to:", email);

  try {
    const info = await transporter.sendMail({
      from: `"EsecGPT" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset</h2>
        <h1>${otp}</h1>
        <p>This OTP expires in 10 minutes.</p>
      `,
    });
    console.log("✅ Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ NodeMailer Error:");
    console.error(error.message);
    throw new Error("Failed to send OTP email");
  }
};

export default sendOTPEmail;