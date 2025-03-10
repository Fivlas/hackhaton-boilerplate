import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .email("Nieprawidłowy adres email")
        .trim()
        .min(1, "Email jest wymagany"),
    password: z.string().trim().min(1, "Haslo jest wymagane"),
    rememberMe: z.boolean(),
});

export type LoginValues = z.infer<typeof loginSchema>;
