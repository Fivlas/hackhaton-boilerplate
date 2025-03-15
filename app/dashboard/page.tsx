"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { ArrowDownRight, ArrowUpRight, User } from "lucide-react";
import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 700 },
    { name: "Jun", value: 900 },
];

const barData = [
    { name: "Mon", users: 20 },
    { name: "Tue", users: 40 },
    { name: "Wed", users: 30 },
    { name: "Thu", users: 50 },
    { name: "Fri", users: 45 },
    { name: "Sat", users: 25 },
    { name: "Sun", users: 35 },
];

const page = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">API Keys</h2>
                <p className="text-muted-foreground">
                    Manage your API keys for development and production
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 w-full">
                {/* <Card className="animate-in fade-in zoom-in duration-500"> */}
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Users
                        </CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10</div>
                        <div className={`flex items-center text-sm`}>
                            {true ? (
                                <ArrowUpRight className="mr-1 h-4 w-4" />
                            ) : (
                                <ArrowDownRight className="mr-1 h-4 w-4" />
                            )}
                            20% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Users
                        </CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10</div>
                        <div className={`flex items-center text-sm`}>
                            {true ? (
                                <ArrowUpRight className="mr-1 h-4 w-4" />
                            ) : (
                                <ArrowDownRight className="mr-1 h-4 w-4" />
                            )}
                            20% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Users
                        </CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10</div>
                        <div className={`flex items-center text-sm`}>
                            {true ? (
                                <ArrowUpRight className="mr-1 h-4 w-4" />
                            ) : (
                                <ArrowDownRight className="mr-1 h-4 w-4" />
                            )}
                            20% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Users
                        </CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10</div>
                        <div className={`flex items-center text-sm`}>
                            {true ? (
                                <ArrowUpRight className="mr-1 h-4 w-4" />
                            ) : (
                                <ArrowDownRight className="mr-1 h-4 w-4" />
                            )}
                            20% from last month
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col md:flex-row gap-6 w-full">
                {/* <Card className="animate-in slide-in-from-left duration-500"> */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Revenue Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="var(--primary)"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* <Card className="animate-in slide-in-from-right duration-500"> */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Daily Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        dataKey="users"
                                        stroke="var(--primary)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default page;
