import { Handler } from "@netlify/functions";
import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY missing at runtime");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Email service not configured",
      }),
    };
  }

  // ✅ CREATE CLIENT HERE
  const resend = new Resend(apiKey);

  try {
    // Parse the form data
    const { name, email, phone, company, service, message } = JSON.parse(
      event.body || "{}",
    );

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid email address" }),
      };
    }

    // Auto-responder email template
    const autoResponderHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background-color: #0066cc; padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Message Received ✓</h1>
              <p style="color: #e6f2ff; margin: 15px 0 0 0; font-size: 16px;">JEFCOM Engineering Group</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px; margin-bottom: 25px;">
                Hello <strong>${name}</strong>,
              </p>
              
              <p style="font-size: 16px; margin-bottom: 25px;">
                Thank you for your interest in JEFCOM's <strong>${service}</strong> services. We've received your inquiry and our team is reviewing your requirements.
              </p>
              
              <!-- What to Expect -->
              <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #0066cc;">
                <h3 style="color: #0066cc; margin-top: 0; font-size: 18px; font-weight: 600;">What to Expect Next:</h3>
                <ul style="margin: 15px 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">Our technical team will review your project details</li>
                  <li style="margin-bottom: 8px;">You'll receive a response within 24 hours</li>
                  <li style="margin-bottom: 8px;">We'll provide a detailed consultation and quotation</li>
                </ul>
              </div>
              
              <!-- Submission Details -->
              <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h3 style="margin-top: 0; font-size: 16px; color: #555; font-weight: 600;">Submission Summary:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #777; width: 100px;">Service:</td>
                    <td style="padding: 8px 0; font-weight: 500;">${service}</td>
                  </tr>
                  ${
                    company
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #777;">Company:</td>
                    <td style="padding: 8px 0;">${company}</td>
                  </tr>
                  `
                      : ""
                  }
                  <tr>
                    <td style="padding: 8px 0; color: #777;">Contact:</td>
                    <td style="padding: 8px 0;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #777;">Submitted:</td>
                    <td style="padding: 8px 0;">${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Contact Info -->
              <div style="margin: 35px 0;">
                <h3 style="color: #0066cc; font-size: 18px; font-weight: 600; margin-bottom: 15px;">Get in Touch</h3>
                <p style="margin: 8px 0;"><strong>Phone:</strong> +234 803 301 4900</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> info@jefcomgroup.com</p>
                <p style="margin: 8px 0;"><strong>Address:</strong> 10, Badejo Kalesanwo Street, Matori Industrial Area, Lagos</p>
              </div>
              
              <p style="font-size: 16px; margin-top: 30px;">
                We look forward to discussing your project in detail.
              </p>
              
              <p style="font-size: 16px; margin-top: 25px;">
                Best regards,<br>
                <strong>The JEFCOM Team</strong>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; font-weight: 600; color: #0066cc;">JEFCOM Engineering Group</p>
              <p style="margin: 5px 0; color: #777; font-size: 14px;">Electrical Engineering Excellence</p>
              <p style="margin: 15px 0 0 0; color: #999; font-size: 12px;">
                Automated response. Please do not reply directly to this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Company notification email template
    const companyNotificationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background-color: #0066cc; padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
              <p style="color: #e6f2ff; margin: 10px 0 0 0;">JEFCOM Engineering</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <!-- Alert -->
              <div style="background-color: #f0f7ff; padding: 15px; border-radius: 6px; margin-bottom: 25px; border-left: 4px solid #0066cc;">
                <p style="margin: 0; color: #0066cc; font-weight: 500;">
                  ⚡ New lead submitted via website contact form
                </p>
              </div>
              
              <!-- Contact Details -->
              <div style="margin-bottom: 30px;">
                <h3 style="color: #0066cc; margin-top: 0; font-size: 18px; font-weight: 600;">Contact Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 500;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">Phone:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <a href="tel:${phone}" style="color: #0066cc; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>
                  ${
                    company
                      ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #555;">Company:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${company}</td>
                  </tr>
                  `
                      : ""
                  }
                  <tr>
                    <td style="padding: 10px 0; color: #555;">Service:</td>
                    <td style="padding: 10px 0; font-weight: 500; color: #0066cc;">${service}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Message -->
              <div style="margin-bottom: 30px;">
                <h3 style="color: #0066cc; font-size: 18px; font-weight: 600; margin-bottom: 15px;">Project Details</h3>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border: 1px solid #e0e0e0;">
                  <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <!-- Status -->
              <div style="background-color: #f0f7ff; padding: 15px; border-radius: 6px; margin: 25px 0;">
                <p style="margin: 0; color: #0066cc;">
                  ✅ Auto-response sent to customer at ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              
              <!-- Quick Actions -->
              <div style="text-align: center; margin-top: 35px;">
                <a href="mailto:${email}" style="background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px; font-weight: 500;">Reply via Email</a>
                <a href="tel:${phone}" style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px; font-weight: 500;">Call Customer</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0; color: #777; font-size: 13px;">
              <p style="margin: 5px 0;">JEFCOM Engineering Group • Website Contact Form</p>
              <p style="margin: 5px 0;">Received: ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log("Sending emails...");

    // Send both emails
    const [autoResponse, teamNotification] = await Promise.all([
      // Auto-responder to customer
      resend.emails.send({
        from: "JEFCOM Engineering <noreply@jefcomgroup.com>",
        to: email,
        subject: `Thank You for Contacting JEFCOM - ${service}`,
        html: autoResponderHtml,
        replyTo: "info@jefcomgroup.com",
      }),

      // Notification to company
      resend.emails.send({
        from: "JEFCOM Website <noreply@jefcomgroup.com>",
        to: "info@jefcomgroup.com",
        replyTo: email,
        subject: `New Inquiry: ${service} - ${name}`,
        html: companyNotificationHtml,
      }),
    ]);

    console.log("Emails sent successfully");

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message:
          "Message sent successfully! Check your email for confirmation.",
      }),
    };
  } catch (error) {
    console.error("Error processing contact form:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error:
          "Unable to send message. Please try again or contact us directly.",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
