import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface SectionCardsProps {
    title: string;
    value: string;
    trend: string;
    isPositive: boolean;
    description: string;
    footer: string;
}

export function SectionCards({ cardsData }: { cardsData: SectionCardsProps[] }) {
    return (
        <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            {cardsData.map((card, index) => (
                <Card key={index} className="@container/card">
                    <CardHeader className="relative">
                        <CardDescription>{card.title}</CardDescription>
                        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                            {card.value}
                        </CardTitle>
                        <div className="absolute right-4 top-4">
                            <Badge
                                variant="outline"
                                className="flex gap-1 rounded-lg text-xs"
                            >
                                {card.isPositive ? (
                                    <TrendingUpIcon className="size-3" />
                                ) : (
                                    <TrendingDownIcon className="size-3" />
                                )}
                                {card.trend}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                            {card.description}{" "}
                            {card.isPositive ? (
                                <TrendingUpIcon className="size-4" />
                            ) : (
                                <TrendingDownIcon className="size-4" />
                            )}
                        </div>
                        <div className="text-muted-foreground">
                            {card.footer}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
