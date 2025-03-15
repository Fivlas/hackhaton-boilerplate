import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { sendMail } from "./lib/send-mail";

const prisma = new PrismaClient();
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
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
});
