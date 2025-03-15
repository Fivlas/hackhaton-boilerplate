"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Tooltip } from "@/components/ui/tooltip";
import { ArrowDownRight, ArrowUpRight, User } from "lucide-react";
import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts";

const lineChartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

const barChartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--secondary)",
    },
} satisfies ChartConfig;

const lineChartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
];

const barChartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
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

            <div className="flex flex-col md:flex-row gap-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Revenue Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={lineChartConfig}>
                            <LineChart
                                accessibilityLayer
                                data={lineChartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Line
                                    dataKey="desktop"
                                    type="natural"
                                    stroke="var(--color-desktop)"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Daily Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={barChartConfig}>
                            <BarChart accessibilityLayer data={barChartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent indicator="dashed" />
                                    }
                                />
                                <Bar
                                    dataKey="desktop"
                                    fill="var(--color-desktop)"
                                    radius={4}
                                />
                                <Bar
                                    dataKey="mobile"
                                    fill="var(--color-mobile)"
                                    radius={4}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default page;
