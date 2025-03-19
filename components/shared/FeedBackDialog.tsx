"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import LoadingButton from "../ui/LoadingButton";
import { sendMail } from "@/lib/send-mail";

export function FeedbackDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState("suggestion");
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState("");
    const [email, setEmail] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            await sendMail({
                subject: `Feedback - ${feedbackType}`,
                text: `Email: ${email}\n\nRating: ${rating}\n\n${comment}`,
                sendTo: process.env.SMTP_SERVER_USERNAME
            })

            toast.success("Feedback submitted", {
                description: "Thank you for your feedback!",
            });
            
            setFeedbackType("suggestion");
            setRating(null);
            setComment("");
            setEmail("");
            setOpen(false);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Share your feedback</DialogTitle>
                        <DialogDescription>
                            We value your input to help us improve our product.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="feedback-type">Feedback type</Label>
                            <RadioGroup
                                id="feedback-type"
                                value={feedbackType}
                                onValueChange={setFeedbackType}
                                className="flex gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="suggestion"
                                        id="suggestion"
                                    />
                                    <Label htmlFor="suggestion">
                                        Suggestion
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="issue" id="issue" />
                                    <Label htmlFor="issue">Issue</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        value="praise"
                                        id="praise"
                                    />
                                    <Label htmlFor="praise">Praise</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="rating">
                                How would you rate your experience?
                            </Label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Button
                                        key={value}
                                        type="button"
                                        variant={
                                            rating === value
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        className="h-10 w-10"
                                        onClick={() => setRating(value)}
                                    >
                                        {value}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="comment">Comments</Label>
                            <Textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Please share your thoughts..."
                                className="resize-none"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email (optional)</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <LoadingButton
                            type="submit"
                            disabled={isPending}
                            className="w-full sm:w-auto"
                            loading={isPending}
                        >
                            <span className="flex items-center gap-2">
                            {isPending ? "Submitting..." : "Submit Feedback"}
                            {!isPending && <Send className="h-4 w-4" />}
                            </span>
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
