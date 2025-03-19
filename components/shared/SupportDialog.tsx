"use client";

import React, { useTransition } from "react";
import { useState } from "react";
import { Paperclip, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import LoadingButton from "../ui/LoadingButton";
import { sendMail } from "@/lib/send-mail";

export function SupportDialog({ children }: { children: React.ReactNode }) {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            //TODO: Add attachments
            await sendMail({
                subject: `Support Ticket - ${subject}`,
                text: `Email: ${email}\n\n${description}`,
                sendTo: process.env.SMTP_SERVER_USERNAME
            })

            setOpen(false);
            setSubject("");
            setDescription("");
            setFiles(null);
            setEmail("");

            toast.success("Support ticket created", {
                description: "We'll get back to you as soon as possible.",
            });
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Contact Support</DialogTitle>
                    <DialogDescription>
                        Submit a ticket to the Vercel support team. We aim to
                        respond as described in our Support Terms.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Brief description of your issue"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Your Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Please provide as much detail as possible"
                                className="min-h-[120px]"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="attachments">
                                Attachments (optional)
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="attachments"
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => setFiles(e.target.files)}
                                />
                                <Label
                                    htmlFor="attachments"
                                    className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Paperclip className="h-4 w-4" />
                                    {files && files.length > 0
                                        ? `${files.length} file(s) selected`
                                        : "Attach files"}
                                </Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <LoadingButton
                            type="submit"
                            disabled={isPending}
                            className="gap-2"
                            loading={isPending}
                        >
                            {isPending ? "Submitting..." : "Submit Ticket"}
                            {!isPending && <Send className="h-4 w-4" />}
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
