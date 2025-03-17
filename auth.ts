import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { sendMail } from "./lib/send-mail";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60
        },
        session: {
            expiresIn: 60 * 60 * 24 * 7, // 7 days
            updateAge: 60 * 60 * 24 // 1 day
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }: { user: { email: string }; url: string; token: string; }, request: unknown ) => {
            await sendMail({
                sendTo: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email: ${url}`,
            });
        },
        sendResetPassword: async ({ user, url, token }: { user: { email: string }; url: string; token: string; }, request: unknown ) => {
            await sendMail({
                sendTo: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        },
    },
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailVerification: async ({ user, newEmail, url, token }, request) => {
                await sendMail({
                    sendTo: user.email,
                    subject: 'Approve email change',
                    text: `Click the link to approve the change: ${url}`
                })
            }
        }
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "facebook"]
        }
    },
});
