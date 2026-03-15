/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../errorHelpers/AppError";

interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData?: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

/**
 * Mock email sender for QuickHire MVP.
 * Removes dependency on SMTP environment variables.
 */
export const sendEmail = async ({
  to,
  subject,
}: SendEmailOptions) => {
  try {
    console.log(`\u2709\uFE0F [MOCK EMAIL] To: ${to}, Subject: ${subject}`);
    // In a real app, you'd use nodemailer here.
    return true;
  } catch (error: any) {
    console.log("email sending error: ", error.message);
    throw new AppError(401, "Email Error!");
  }
};
