import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { ActiveThemeProvider } from "@/context/ColorSchemeContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hackhaton boilerplate",
    description: "A boilerplate for building a hackathon project",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const activeThemeValue = cookieStore.get("active_theme")?.value;
    const isScaled = activeThemeValue?.endsWith("-scaled");
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    `${inter.className} antialiased bg-background`,
                    activeThemeValue ? `theme-${activeThemeValue}` : "",
                    isScaled ? "theme-scaled" : ""
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ActiveThemeProvider initialTheme={activeThemeValue}>
                    {children}
                    </ActiveThemeProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
