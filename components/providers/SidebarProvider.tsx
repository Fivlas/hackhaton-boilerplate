"use client"
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider as SidebarProviderComponent,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { AppSidebar } from "../sidebar/app-sidebar";

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const breadcrumbItemArray = pathname.replace(/^\/dashboard\//, "").split("/");
    return (
        <SidebarProviderComponent>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/dashboard">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {pathname !== "/dashboard" &&
                                    breadcrumbItemArray.map((item, index) => {
                                        if (item === "") return null;

                                        const href = `/dashboard/${breadcrumbItemArray
                                            .slice(0, index + 1)
                                            .join("/")}`;
                                        const formatedItem =
                                            item.charAt(0).toUpperCase() +
                                            item.slice(1);

                                        return (
                                            <React.Fragment key={index}>
                                                <BreadcrumbSeparator className="hidden md:block" />
                                                <BreadcrumbItem>
                                                    {index ===
                                                    breadcrumbItemArray.length -
                                                        1 ? (
                                                        <BreadcrumbPage>
                                                            {formatedItem}
                                                        </BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink
                                                            href={href}
                                                        >
                                                            {formatedItem}
                                                        </BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                            </React.Fragment>
                                        );
                                    })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProviderComponent>
    );
};

export default SidebarProvider;
