"use client"
import CardWithActions from "@/components/dashboard/CardWithActions";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_KEYS } from "@/constants/dashboard/api-keys";
import { Copy, Key, Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from 'sonner';

const page = () => {
    const [newKeyName, setNewKeyName] = useState('');

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('API key copied to clipboard');
    };

    return (
        <div className="space-y-6">
            <DashboardPageHeader title="API Keys" description="Manage your API keys for development and production" />

            <Card>
                <CardHeader>
                    <CardTitle>Create New API Key</CardTitle>
                    <CardDescription>
                        Generate a new API key for your application
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Input
                            placeholder="API Key Name"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                        />
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Generate Key
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {API_KEYS.map((apiKey) => (
                    <CardWithActions
                        key={apiKey.key}
                        name={apiKey.name}
                        description={`Created on ${apiKey.created} • Last used ${apiKey.lastUsed}`}
                        badgeValue={apiKey.key.slice(0, 8)}
                        BadgeIcon={Key}
                        PrimaryButtonText="Revoke"
                        SecondaryButtonText="Copy"
                        SecondaryButtonIcon={Copy}
                        onClickPrimaryButton={() => {}}
                        onClickSecondaryButton={() => copyToClipboard(apiKey.key)}
                    />
                ))}
            </div>
        </div>
    );
};

export default page;
