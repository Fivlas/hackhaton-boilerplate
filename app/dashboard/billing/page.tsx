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
import { Check, CreditCard, Zap } from "lucide-react";
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
        <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3">Choose Your Plan</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Select the perfect plan for your needs. Upgrade or downgrade at any time.
                </p>
            </div>

            {activePlan && activePlan.plan !== "free" && (
                <Card className="mb-12 bg-gradient-to-r from-primary/10 to-primary/5">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <CreditCard className="h-6 w-6 text-primary" />
                            <CardTitle>Current Subscription</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant="default" className="w-fit">{activePlan?.status}</Badge>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-muted-foreground">Current Plan</span>
                                <Badge variant="secondary" className="w-fit capitalize">{activePlan?.plan}</Badge>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm text-muted-foreground">Next Billing</span>
                                <Badge variant="secondary" className="w-fit">
                                    {activePlan?.periodEnd ? new Date(activePlan?.periodEnd).toLocaleDateString() : "N/A"}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button variant="destructive" onClick={handleCancelSubscription}>
                            Cancel Subscription
                        </Button>
                    </CardFooter>
                </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`relative flex flex-col transform transition-all duration-300 hover:scale-105 ${
                            plan.popular ? "border-primary shadow-xl ring-2 ring-primary/20" : "hover:shadow-lg"
                        }`}
                    >
                        {plan.popular && (
                            <Badge
                                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1"
                                variant="default"
                            >
                                Most Popular
                            </Badge>
                        )}
                        <CardHeader className="pb-8">
                            <CardTitle className="flex flex-col gap-2">
                                <span className="text-2xl font-bold">{plan.name}</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">/{plan.interval}</span>
                                </div>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-2">
                                {plan.description}
                            </p>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-3">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-3 text-sm"
                                    >
                                        <Check className="h-5 w-5 text-primary shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="pt-6">
                            {plan.name !== "Free" ? (
                                <Button
                                    className="w-full py-6 text-lg"
                                    variant={plan.popular ? "default" : "outline"}
                                    onClick={() => handleSubscribe(plan.authPlanName)}
                                    disabled={loading === plan.name || activePlan?.plan === plan.authPlanName}
                                >
                                    {loading === plan.name ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Processing...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Zap className="h-5 w-5" />
                                            {activePlan?.plan === plan.authPlanName
                                                ? "Current Plan"
                                                : "Subscribe Now"}
                                        </div>
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    className="w-full py-6 text-lg"
                                    variant="outline"
                                    disabled
                                >
                                    Free Plan
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default page;
