import SidebarProvider from "@/components/providers/SidebarProvider";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider>
            {children}
        </SidebarProvider>
    );
}
