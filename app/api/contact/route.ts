import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, firmName, email, phone, searchType, message } = body;

    // Validate required fields
    if (!name || !firmName || !email || !phone || !searchType || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate SMTP configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP configuration missing:", {
        hasUser: !!process.env.SMTP_USER,
        hasPassword: !!process.env.SMTP_PASSWORD,
      });
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    // Create transporter
    // Note: You'll need to configure SMTP settings in environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER.trim(),
        pass: process.env.SMTP_PASSWORD.trim().replace(/\s+/g, " "), // Remove extra whitespace and normalize
      },
    });

    // Email content with professional HTML template
    const searchTypeLabels: { [key: string]: string } = {
      "local-authority": "Local Authority",
      "environmental": "Environmental",
      "drainage-water": "Drainage & Water",
      "title": "Title",
      "other": "Other",
    };

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Property Search Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">New Property Search Request</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                You have received a new property search request from your website contact form.
                            </p>
                            
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #111827; width: 150px;">
                                        Name:
                                    </td>
                                    <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">
                                        ${name}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #111827;">
                                        Firm Name:
                                    </td>
                                    <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">
                                        ${firmName}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #111827;">
                                        Email:
                                    </td>
                                    <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">
                                        <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #111827;">
                                        Phone:
                                    </td>
                                    <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">
                                        <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #111827;">
                                        Search Type:
                                    </td>
                                    <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">
                                        ${searchTypeLabels[searchType] || searchType}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #111827; vertical-align: top;">
                                        Message:
                                    </td>
                                    <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #374151;">
                                        ${message.replace(/\n/g, "<br>")}
                                    </td>
                                </tr>
                            </table>
                            
                            <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 4px;">
                                <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
                                    <strong>Next Steps:</strong> Please review this request and respond to the client at your earliest convenience. You can reply directly to this email or contact them using the information provided above.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; text-align: center;">
                            <p style="margin: 0; color: #6b7280; font-size: 12px;">
                                This email was sent from the Property Search Solutions contact form.<br>
                                Property Search Solutions Ltd | ICO Registered
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    // Plain text version for email clients that don't support HTML
    const textContent = `
New Property Search Request

You have received a new property search request from your website contact form.

Name: ${name}
Firm Name: ${firmName}
Email: ${email}
Phone: ${phone}
Search Type: ${searchTypeLabels[searchType] || searchType}

Message:
${message}

---
This email was sent from the Property Search Solutions contact form.
Property Search Solutions Ltd | ICO Registered
    `;

    // Send email
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `New Property Search Request - ${searchTypeLabels[searchType] || searchType} from ${firmName}`,
      text: textContent,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    
    // Provide more detailed error information in development
    const errorMessage = process.env.NODE_ENV === "development" 
      ? error.message || "Failed to send email. Please check your SMTP configuration."
      : "Failed to send email. Please try again later.";
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.toString() : undefined
      },
      { status: 500 }
    );
  }
}

