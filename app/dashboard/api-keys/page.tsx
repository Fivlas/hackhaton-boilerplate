"use client"
import CardWithActions from "@/components/dashboard/CardWithActions";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Key, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from 'sonner';

const API_KEYS = [
    {
        name: 'Development',
        key: 'dev_sk_1234567890abcdef',
        created: '2024-01-15',
        lastUsed: '2024-03-20',
    },
    {
        name: 'Production',
        key: 'prod_sk_0987654321zyxwvu',
        created: '2024-02-01',
        lastUsed: '2024-03-21',
    },
];

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
