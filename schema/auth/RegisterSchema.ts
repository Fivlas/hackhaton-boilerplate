import { z } from "zod";

export const signUpSchema = z
    .object({
        email: z
            .string()
            .trim()
            .min(1, "Email jest wymagane")
            .email("Nieprawidłowy adres email"),
        username: z
            .string()
            .min(1, "Nazwa konta jest wymagana")
            .regex(
                /^[a-zA-Z0-9_-]+$/,
                "Tylko litery, liczby, - i _ są dozwolone"
            ),
        password: z
            .string()
            .trim()
            .min(1, "Haslo jest wymagane")
            .min(8, "Hasło musi posiadać mininum 8 znaków"),
        repeatPassword: z
            .string()
            .trim()
            .min(1, "Powtórz hasło")
            .min(8, "Hasło musi posiadać minimum 8 znaków"),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Hasła nie są identyczne",
        path: ["repeatPassword"],
    });

export type SignUpValues = z.infer<typeof signUpSchema>;
