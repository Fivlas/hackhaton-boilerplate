"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Check, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { plans } from "@/constants/dashboard/billing";

const page = () => {
    const [loading, setLoading] = useState<string | null>(null);
    const [activePlan, setActivePlan] = useState<any | null>(null);

    const handleSubscribe = async (authPlanName: string) => {
        if (!authPlanName) return;
        setLoading(authPlanName);
        try {
            const { error } = await authClient.subscription.upgrade({
                    plan: authPlanName,
                    successUrl: "/dashboard",
                    cancelUrl: "/dashboard/billing",
                    returnUrl: "/dashboard/billing",
                });
            if (error) {
                return toast.error(error.message);
            } 
            toast.success("You have successfully subscribed to the Pro plan");
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(null);
        }
    };

    const handleCancelSubscription = async () => {
        try {
            const { error } = await authClient.subscription.cancel({
                returnUrl: "/dashboard/billing"
            });
            if (error) {
                return toast.error(error.message);
            }
            toast.success("Your subscription has been cancelled");
            setActivePlan(null);
        } catch (error) {
            console.error("Error cancelling subscription:", error);
            toast.error("Failed to cancel subscription");
        }
    };

    useEffect(() => {
        const fetchSubscriptions = async () => {
            const { data: subscriptions } = await authClient.subscription.list();
            if (subscriptions && subscriptions.length > 0) {
                const activeSubscription = subscriptions.find(
                    (sub) => sub.status === "active"
                );
                if (activeSubscription) {
                    setActivePlan(activeSubscription);
                }
            }
        };
        fetchSubscriptions();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
                <p className="text-muted-foreground">
                    Manage your subscription and billing details
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`relative flex flex-col ${
                            plan.popular ? "border-primary shadow-lg" : ""
                        }`}
                    >
                        {plan.popular && (
                            <Badge
                                className="absolute -top-2 -right-2 px-3 py-1"
                                variant="default"
                            >
                                Popular
                            </Badge>
                        )}
                        <CardHeader>
                            <CardTitle>
                                <div className="flex items-center justify-between">
                                    <span>{plan.name}</span>
                                    <Badge
                                        variant="secondary"
                                        className="text-sm"
                                    >
                                        {plan.price}/{plan.interval}
                                    </Badge>
                                </div>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {plan.description}
                            </p>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-2 text-sm">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-2"
                                    >
                                        <Check className="h-4 w-4 text-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            {plan.name !== "Free" ? (
                                <Button
                                    className="w-full"
                                    variant={
                                        plan.popular ? "default" : "outline"
                                    }
                                    onClick={() => handleSubscribe(plan.authPlanName)}
                                    disabled={
                                        loading === plan.name ||
                                        activePlan
                                    }
                                >
                                    {loading === plan.name ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Processing...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-4 w-4" />
                                            {activePlan?.plan === plan.authPlanName
                                                ? "Current Plan"
                                                : "Subscribe"}
                                        </div>
                                    )}
                                </Button>
                            ) : null}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {activePlan && activePlan.plan !== "free" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Billing Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-4">
                            <div>Status: <Badge variant="default">{activePlan?.status}</Badge></div>
                            <div>Plan: <Badge variant="secondary">{activePlan?.plan}</Badge></div>
                            <div>Next Billing Date: <Badge variant="secondary">{activePlan?.periodEnd ? new Date(activePlan?.periodEnd).toLocaleDateString() : "N/A"}</Badge></div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button variant="destructive" onClick={handleCancelSubscription}>Cancel Subscription</Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default page;
