import nodemailer from "nodemailer";
import { IReport } from "../models/Report.js";

function isEmailConfigured() {
  return Boolean(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS);
}

function getTransporter() {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT ?? 587);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    throw new Error("Email configuration is incomplete. Please set EMAIL_HOST, EMAIL_USER, EMAIL_PASS.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendDailySummary(report: IReport) {
  try {
    if (!isEmailConfigured()) {
      console.log("Skipping summary email because SMTP settings are not configured.");
      return;
    }

    const transporter = getTransporter();
    const recipient = process.env.NOTIFICATION_EMAIL ?? "officedata01@gmail.com";

    const html = `
      <div style="font-family: sans-serif;">
        <h2>Ved Logistics Daily Summary</h2>
        <p>${report.description}</p>
        <p><strong>Generated:</strong> ${report.generatedAt.toISOString()}</p>
        <pre>${JSON.stringify(report.meta, null, 2)}</pre>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER ?? "no-reply@vedlogistics.com",
      to: recipient,
      subject: `Ved Logistics Report: ${report.title}`,
      html,
    });
  } catch (error) {
    console.error("Failed to send summary email", error);
  }
}

export async function sendNotification(subject: string, text: string) {
  try {
    if (!isEmailConfigured()) {
      console.log(`Skipping notification email "${subject}" because SMTP settings are not configured.`);
      return;
    }

    const transporter = getTransporter();
    const recipient = process.env.NOTIFICATION_EMAIL ?? "officedata01@gmail.com";

    const html = `
      <div style="font-family: sans-serif;">
        <h2>${subject}</h2>
        <p>${text}</p>
        <p><small>This notification was sent by Ved Logistics.</small></p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER ?? "no-reply@vedlogistics.com",
      to: recipient,
      subject: `Ved Logistics Notification: ${subject}`,
      html,
    });
  } catch (error) {
    console.error("Failed to send notification email", error);
  }
}
