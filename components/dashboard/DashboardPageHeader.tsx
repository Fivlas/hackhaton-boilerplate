import React from "react";

const DashboardPageHeader = ({ title, description }: { title: string; description: string }) => {
    return (
        <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
};

export default DashboardPageHeader;

