"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData) {
  const { firstName, lastName, email, story } = formData;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: "contact@ragam.co.in",
      subject: `Ragam '26 | Inquiry: ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #d97706; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Professional Inquiry - Ragam '26</h2>
          <p>You have received a new Email from the Ragam official website.</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>First Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${firstName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Last Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
          </table>
          
          <div style="margin-top: 20px;">
            <strong>Message/Inquiry:</strong>
            <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b;">${story}</p>
          </div>
          
          <p style="font-size: 12px; color: #777; margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 10px;">
            This email was generated automatically by the Ragam '26 Website.
          </p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send message. Please try again later." };
  }
}
