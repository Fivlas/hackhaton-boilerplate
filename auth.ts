import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { sendMail } from "./lib/send-mail";

const prisma = new PrismaClient();
export const auth = betterAuth({
    emailAndPassword: {    
        enabled: true
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            await sendMail({
                sendTo: user.email,
                subject: 'Verify your email address',
                text: `Click the link to verify your email: ${url}`
            })
        }
    }
});