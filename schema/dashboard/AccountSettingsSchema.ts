import { z } from "zod";

export const accountSettingsSchema = z
    .object({
        avatar: z
            .string()
            .optional(),
        name: z
            .string()
            .optional(),
        email: z
            .string()
            .email("Invalid email address")
            .optional(),
        currentPassword: z
            .string()
            .optional(),
        newPassword: z
            .string()
            .optional(),
        repeatNewPassword: z
            .string()
            .optional(),
    })
    .refine(
        (data) => {
            if (
                data.newPassword ||
                data.repeatNewPassword ||
                data.currentPassword
            ) {
                if (
                    !data.currentPassword ||
                    !data.newPassword ||
                    !data.repeatNewPassword
                ) {
                    return false;
                }
                if (data.newPassword !== data.repeatNewPassword) {
                    return false;
                }
            }
            return true;
        },
        {
            message:
                "If changing password, all password fields must be filled and new passwords must match",
            path: ["repeatNewPassword"],
        }
    );

export type AccountSettingsValues = z.infer<typeof accountSettingsSchema>;
