import { RegisterForm } from "@/components/auth/registerForm";

export default function page() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-2 py-6 md:p-10">
            <div className="flex w-full max-w-lg flex-col gap-6">
                <RegisterForm />
            </div>
        </div>
    );
}
