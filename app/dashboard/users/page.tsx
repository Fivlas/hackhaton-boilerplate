"use client"
import PageHeader from "@/components/dashboard/DashboardPageHeader";
import UsersTable from "@/components/dashboard/UsersTable";
import { users } from "@/constants/dashboard/users";
import React from "react";

const page = () => {
    return (
        <div className="space-y-4">
            <PageHeader title="Users" description="Manage your users" />
            <UsersTable users={users} />
        </div>
    );
};

export default page;
