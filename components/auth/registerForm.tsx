"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { signUpSchema, SignUpValues } from "@/schema/auth/RegisterSchema";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/passwordInput";
import LoadingButton from "@/components/ui/LoadingButton";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
        },
    });

    const onSubmit = (values: SignUpValues) => {
        startTransition(async () => {
            await authClient.signUp.email({
                email: values.email,
                name: values.username,
                password: values.password
            }, 
            {
                onSuccess: () => {
                    toast.success("We sent you email veryfiaction mail");
                },
                onError: (ctx) => {
                    if (ctx.error.status === 422) {
                        if (ctx.error.message === "User already exists") {
                            form.setError("email", {
                                type: "manual",
                                message: "Podany adres email już istnieje"
                            })
                        }

                        if (ctx.error.message === "Failed to create user") {
                            form.setError("username", {
                                type: "manual",
                                message: "Podana nazwa użytkownika już istnieje"
                            })
                        }
                    }

                }
            });
        })
    }

    const handleFacebookClick = () => {
        //facebook
    };

    const handleGoogleClick = () => {
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="rounded-3xl shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Utwórz konto</CardTitle>
                    <CardDescription>
                        Aby kontynuować, utwórz konto do serwisu
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-5">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-6"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid gap-2">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Adres email"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid gap-2">
                                            <FormLabel>Nazwa użytkownika</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Nazwa użytkownika"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <FormLabel>Hasło</FormLabel>
                                            </div>

                                            <FormControl>
                                                <PasswordInput
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="repeatPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <FormLabel>Powtórz Hasło</FormLabel>
                                            </div>
                                            <FormControl>
                                                <PasswordInput
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <LoadingButton type="submit" className="w-full" loading={isPending}>
                                Utwórz konto
                            </LoadingButton>
                        </form>
                    </Form>

                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 px-2 text-muted-foreground bg-card">
                            lub
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                        <Button
                            onClick={() => handleGoogleClick()}
                            variant="outline"
                            className="w-full flex items-center justify-center px-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                role="img"
                                color="currentColor"
                                className="w-5 h-5"
                                aria-hidden="true"
                            >
                                <path
                                    fill="#4285F4"
                                    fillRule="evenodd"
                                    d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.642h6.458a5.52 5.52 0 0 1-2.394 3.622v3.01h3.878c2.269-2.088 3.578-5.165 3.578-8.82Z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fill="#34A853"
                                    fillRule="evenodd"
                                    d="M12.001 24c3.24 0 5.956-1.074 7.942-2.907l-3.878-3.01c-1.075.72-2.45 1.145-4.064 1.145-3.125 0-5.77-2.111-6.715-4.948H1.277v3.11A12 12 0 0 0 12.001 24"
                                    clipRule="evenodd"
                                />
                                <path
                                    fill="#FBBC05"
                                    fillRule="evenodd"
                                    d="M5.285 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.136-1.56.376-2.28V6.611h-4.01A12 12 0 0 0 0 12.001c0 1.936.464 3.769 1.276 5.389z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fill="#EA4335"
                                    fillRule="evenodd"
                                    d="M12.001 4.773c1.762 0 3.344.605 4.587 1.794l3.442-3.442C17.952 1.19 15.235 0 12.001 0c-4.69 0-8.75 2.69-10.724 6.61l4.01 3.11C6.23 6.884 8.875 4.773 12 4.773Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="ml-2">Kontynuj z Google</span>
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center px-4"
                            onClick={() => handleFacebookClick()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                role="img"
                                color="currentColor"
                                className="w-5 h-5"
                                height="24"
                                aria-hidden="true"
                            >
                                <path
                                    fill="#1877F2"
                                    d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.855v-8.386H7.078V12h3.047V9.357c0-3.008 1.791-4.67 4.533-4.67 1.313 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.386C19.612 22.955 24 17.99 24 12"
                                ></path>
                                <path
                                    fill="#fff"
                                    d="M16.671 15.469 17.203 12h-3.328V9.749c0-.949.465-1.874 1.956-1.874h1.513V4.922s-1.374-.234-2.686-.234c-2.742 0-4.533 1.66-4.533 4.668V12H7.078v3.469h3.047v8.385a12.1 12.1 0 0 0 3.75 0V15.47h2.796Z"
                                ></path>
                            </svg>
                            <span className="ml-2">Kontynuj z Facebook</span>
                        </Button>
                    </div>

                    <div className="text-center text-sm mt-4">
                        Posiadasz konto?{" "}
                        <Link href="/login" className="underline underline-offset-4">
                            Zaloguj się
                        </Link>
                    </div>
                </CardContent>
            </Card>

            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                Kontynując, zgadzasz się na nasze{" "}
                <a href="#">Warunki świadczenia usług</a> i{" "}
                <a href="#">Politykę prywatności</a>.
            </div>
        </div>
    );
}
