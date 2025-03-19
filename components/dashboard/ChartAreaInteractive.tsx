"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ChartDataItem {
    date: string;
    [key: string]: string | number;
}

interface ChartSeriesConfig {
    label: string;
    color: string;
    key: string;
    opacity?: {
        start: number;
        end: number;
    };
}

interface ChartConfigProps {
    title: string;
    description: string;
    series: ChartSeriesConfig[];
}

interface ChartAreaProps {
    data: ChartDataItem[];
    config: ChartConfigProps;
    title?: string;
    description?: string;
    height?: number;
    timeRanges?: {
        value: string;
        label: string;
        days: number;
    }[];
}

const DEFAULT_TIME_RANGES = [
    { value: "90d", label: "Last 3 months", days: 90 },
    { value: "30d", label: "Last 30 days", days: 30 },
    { value: "7d", label: "Last 7 days", days: 7 },
];

export function ChartAreaInteractive({
    data,
    config,
    title = config.title,
    description = config.description,
    height = 250,
    timeRanges = DEFAULT_TIME_RANGES,
}: ChartAreaProps) {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = React.useState("30d");

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const filteredData = React.useMemo(() => {
        const selectedRange = timeRanges.find(range => range.value === timeRange);
        if (!selectedRange) return data;

        const referenceDate = new Date(data[data.length - 1].date);
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - selectedRange.days);

        return data.filter(item => new Date(item.date) >= startDate);
    }, [data, timeRange, timeRanges]);

    const dataConfig = config.series.map(series => ({
        key: series.key,
        label: series.label,
        color: series.color,
        opacity: series.opacity ?? { start: 0.8, end: 0.1 }
    }));

    return (
        <Card className="@container/card">
            <CardHeader className="relative">
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    <span className="@[540px]/card:block hidden">
                        {description}
                    </span>
                    <span className="@[540px]/card:hidden">
                        {description.split(" ").slice(-2).join(" ")}
                    </span>
                </CardDescription>
                <div className="absolute right-4 top-4">
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="@[767px]/card:flex hidden"
                    >
                        {timeRanges.map(range => (
                            <ToggleGroupItem
                                key={range.value}
                                value={range.value}
                                className="h-8 px-2.5"
                            >
                                {range.label}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="@[767px]/card:hidden flex w-40"
                            aria-label="Select time range"
                        >
                            <SelectValue placeholder={timeRanges[0].label} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            {timeRanges.map(range => (
                                <SelectItem
                                    key={range.value}
                                    value={range.value}
                                    className="rounded-lg"
                                >
                                    {range.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={dataConfig as unknown as ChartConfig}
                    className={`aspect-auto w-full`}
                    style={{ height: `${height}px` }}
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            {dataConfig.map(config => (
                                <linearGradient
                                    key={config.key}
                                    id={`fill${config.key}`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor={config.color}
                                        stopOpacity={config.opacity?.start ?? 1.0}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={config.color}
                                        stopOpacity={config.opacity?.end ?? 0.1}
                                    />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        {dataConfig.map(config => (
                            <Area
                                key={config.key}
                                dataKey={config.key}
                                type="natural"
                                fill={`url(#fill${config.key})`}
                                stroke={config.color}
                                stackId="a"
                            />
                        ))}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
