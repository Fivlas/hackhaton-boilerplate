"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import React, { useState } from "react";

const plans = [
    {
      name: 'Free',
      description: 'Perfect for side projects and learning',
      price: '$0',
      interval: 'forever',
      features: [
        'Up to 3 projects',
        '1GB storage',
        'Basic analytics',
        'Community support',
      ],
      priceId: '',
      popular: false,
    },
    {
      name: 'Pro',
      description: 'For professional developers and small teams',
      price: '$19',
      interval: 'month',
      features: [
        'Unlimited projects',
        '10GB storage',
        'Advanced analytics',
        'Priority support',
        'Custom domains',
        'Team collaboration',
      ],
      priceId: 'price_pro_monthly',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large teams and organizations',
      price: '$99',
      interval: 'month',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Custom analytics',
        'Dedicated support',
        'SLA guarantee',
        'Custom integrations',
        'Advanced security',
      ],
      priceId: 'price_enterprise_monthly',
      popular: false,
    },
  ];

const page = () => {
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (priceId: string) => {
      if (!priceId) return;
      setLoading(priceId);
      
      try {
        // Here you would typically:
        // 1. Call your backend to create a Stripe Checkout Session
        // 2. Redirect to Stripe Checkout
        // const response = await fetch('/api/create-checkout-session', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ priceId }),
        // });
        // const { url } = await response.json();
        // window.location.href = url;
        
        console.log('Subscribing to plan with price ID:', priceId);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(null);
      }
    };
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
                            <Button
                                className="w-full"
                                variant={plan.popular ? "default" : "outline"}
                                onClick={() => handleSubscribe(plan.priceId)}
                                disabled={
                                    loading === plan.priceId || !plan.priceId
                                }
                            >
                                {loading === plan.priceId ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        Processing...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4" />
                                        {plan.priceId
                                            ? "Subscribe"
                                            : "Current Plan"}
                                    </div>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-muted-foreground">
                        No billing history available.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;
