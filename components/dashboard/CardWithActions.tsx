import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { type LucideIcon } from "lucide-react";
import { Button } from "../ui/button";

interface CardWithActionsProps {
    name: string;
    description: string;
    badgeValue: string;
    PrimaryButtonText: string;
    SecondaryButtonText: string;
    SecondaryButtonIcon: LucideIcon;
    BadgeIcon: LucideIcon;
    onClickPrimaryButton: () => void;
    onClickSecondaryButton: () => void;
}

const CardWithActions = ({ name, description, badgeValue, BadgeIcon, PrimaryButtonText, SecondaryButtonText, SecondaryButtonIcon, onClickPrimaryButton, onClickSecondaryButton } : CardWithActionsProps) => {
    return (
        <Card>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{name}</h3>
                            <Badge variant="outline">
                                {/* {apiKey.key.slice(0, 8)}... */}
                                <BadgeIcon className="mr-2 h-4 w-4"/>
                                {badgeValue}
                            </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {description}
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col md:flex-row">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onClickPrimaryButton}
                        >
                            <SecondaryButtonIcon className="mr-2 h-4 w-4"/>
                            {SecondaryButtonText}
                        </Button>
                        <Button variant="destructive" size="sm">
                            {PrimaryButtonText}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CardWithActions;
