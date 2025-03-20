"use server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: SMTP_SERVER_HOST,
    port: 587,
    secure: false, // should be false for STARTTLS
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
    },
});

export async function sendMail({
    sendTo,
    subject,
    text,
    html,
    attachments,
}: {
    sendTo?: string;
    subject: string;
    text: string;
    html?: string;
    attachments?: { filename: string; path: string }[];
}) {
    try {
        await transporter.verify();
    } catch (error) {
        console.error("Mail server verification failed:", error);
        return;
    }

    const mailOptions = {
        from: SMTP_SERVER_USERNAME,
        to: sendTo || SITE_MAIL_RECIEVER,
        subject,
        text,
        html: html || "",
        attachments: attachments || [],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Failed to send email:", error);
        return null;
    }
}
