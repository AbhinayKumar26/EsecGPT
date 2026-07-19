import { Resend } from 'resend';

// Initialize Resend with your API Key from .env
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp) => {
  console.log("📧 Sending OTP via Resend to:", email);

  try {
    const data = await resend.emails.send({
      from: 'EsecGPT <onboarding@resend.dev>', // Note: Jab tak tum domain verify nahi karte, tumhe 'onboarding@resend.dev' use karna hoga
      to: [email],
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: sans-serif;">
          <h2>Password Reset Request</h2>
          <p>Your OTP code is:</p>
          <h1 style="color: #4A90E2;">${otp}</h1>
          <p>This OTP expires in 10 minutes.</p>
        </div>
      `,
    });

    console.log("✅ Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Resend Error:", error);
    throw new Error("Failed to send OTP email");
  }
};

export default sendOTPEmail;