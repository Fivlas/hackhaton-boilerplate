"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { accountSettingsSchema, AccountSettingsValues } from "@/schema/dashboard/AccountSettingsSchema";
import { UserCircle2 } from "lucide-react";
import React from "react";
import { useSession } from "@/hooks/useSession";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";

const page = () => {
    const session = useSession();
    const form = useForm<AccountSettingsValues>({
        resolver: zodResolver(accountSettingsSchema),
        defaultValues: {
            avatar: "",
            currentPassword: "",
            email: session?.email,
            name: session?.name,
            newPassword: "",
            repeatNewPassword: "",
        },
    });

    const onSubmit = async (data: AccountSettingsValues) => {
        if (data.currentPassword && data.newPassword) {
            await authClient.changePassword({
                newPassword: data.newPassword,
                currentPassword: data.currentPassword,
                revokeOtherSessions: true,
            });
        }

        if (data.name !== session?.name) {
            await authClient.updateUser({
                name: data.name
            })
        }

        if (data.email !== session?.email) {
            await authClient.changeEmail({
                newEmail: data.email as string,
                callbackURL: "/dashboard",
            })
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <DashboardPageHeader title="Account Settings" description="Manage your account settings" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                                <CardDescription>
                                    Manage your profile information.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                                        <UserCircle2 className="h-10 w-10" />
                                    </div>
                                    <Button variant="outline">Change Avatar</Button>
                                </div>
                                <Separator />
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} autoComplete="username"/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="john@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you'll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} name="current-password" autoComplete="current-password"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} name="new-password" autoComplete="new-password"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="repeatNewPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button">Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default page;
