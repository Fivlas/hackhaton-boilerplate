"use client"
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
import { Copy, Key, Plus } from "lucide-react";
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
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">API Keys</h2>
                <p className="text-muted-foreground">
                    Manage your API keys for development and production
                </p>
            </div>

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
                    <Card key={apiKey.key}>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">
                                            {apiKey.name}
                                        </h3>
                                        <Badge variant="outline">
                                            <Key className="mr-1 h-3 w-3" />
                                            {apiKey.key.slice(0, 8)}...
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Created on {apiKey.created} • Last used{" "}
                                        {apiKey.lastUsed}
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-col md:flex-row">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            copyToClipboard(apiKey.key)
                                        }
                                    >
                                        <Copy className="mr-2 h-4 w-4" />
                                        Copy
                                    </Button>
                                    <Button variant="destructive" size="sm">
                                        Revoke
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default page;
