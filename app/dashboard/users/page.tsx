import { Button } from "@/components/ui/button";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Search, SquarePen, Trash } from "lucide-react";
import React from "react";

const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "Active",
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "User",
        status: "Inactive",
    },
];

const page = () => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-8" />
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <ContextMenu key={user.id}>
                                <ContextMenuTrigger asChild>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            {user.name}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                    user.status === "Active"
                                                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                                        : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                </ContextMenuTrigger>
                                <ContextMenuContent>
                                    <ContextMenuItem><SquarePen/>Edit</ContextMenuItem>
                                    <ContextMenuItem><Trash/>Remove</ContextMenuItem>
                                </ContextMenuContent>
                            </ContextMenu>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default page;
