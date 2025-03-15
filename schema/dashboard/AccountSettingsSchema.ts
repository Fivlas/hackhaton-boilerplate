import { z } from "zod";

export const accountSettingsSchema = z.object({
    avatar: z
        .string()
        .optional(),
    firstName: z
        .string()
        .min(1, "First name is required")
        .optional(),
    lastName: z
        .string()
        .min(1, "Last name is required")
        .optional(),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address")
        .optional(),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
        .optional(),
    currentPassword: z
        .string()
        .min(1, "Current password is required")
        .optional(),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .optional(),
    repeatNewPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .optional()
    }).refine((data) => {
        if (data.currentPassword) {
            if (!data.newPassword || !data.repeatNewPassword) {
                return false;
            }
            return data.newPassword === data.repeatNewPassword;
        }
        return true;
    }, {
        message: "New password and repeat password are required and must match when changing password",
        path: ["repeatNewPassword"]
    });

export type AccountSettingsValues = z.infer<typeof accountSettingsSchema>;