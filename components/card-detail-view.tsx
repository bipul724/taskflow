"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MoreHorizontal, Plus, Paperclip, CheckCircle, Pencil, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/lib/generated/prisma";
import { Button } from "@/components/ui/button";
import { updateCard } from "@/actions/update-card";

interface CardDetailViewProps {
    card: Card;
    listTitle: string;
    boardTitle: string;
    boardId: string;
}

export const CardDetailView = ({ card, listTitle, boardTitle, boardId }: CardDetailViewProps) => {
    const router = useRouter();
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description || "");
    const [isPending, startTransition] = useTransition();

    const handleTitleBlur = () => {
        if (title.trim() === "") {
            setTitle(card.title); // Reset to original if empty
            return;
        }

        if (title !== card.title) {
            startTransition(async () => {
                const result = await updateCard({
                    cardId: card.id,
                    boardId,
                    title: title.trim(),
                });

                if (result.error) {
                    toast.error(result.error);
                    setTitle(card.title); // Reset on error
                } else {
                    toast.success("Card title updated!");
                    router.refresh();
                }
            });
        }
    };

    const handleDescriptionBlur = () => {
        if (description !== (card.description || "")) {
            startTransition(async () => {
                const result = await updateCard({
                    cardId: card.id,
                    boardId,
                    description,
                });

                if (result.error) {
                    toast.error(result.error);
                    setDescription(card.description || "");
                } else {
                    toast.success("Description updated!");
                    router.refresh();
                }
            });
        }
    };

    return (
        <div className="h-full bg-neutral-950 text-white">
            {/* Header */}
            <div className="border-b border-neutral-800 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Link
                            href={`/board/${boardId}`}
                            className="hover:text-white transition-colors"
                        >
                            {boardTitle}
                        </Link>
                        <span>›</span>
                        <span className="text-white">{listTitle}</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-white hover:bg-neutral-800"
                    >
                        <MoreHorizontal className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="flex">
                {/* Main Content */}
                <div className="flex-1 p-8 max-w-3xl">
                    {/* Title */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleBlur}
                        disabled={isPending}
                        className="text-2xl font-bold bg-transparent border-none outline-none w-full text-white mb-6 focus:bg-neutral-900 focus:px-2 focus:py-1 focus:rounded transition-all disabled:opacity-50"
                    />

                    {/* Description */}
                    <div className="mb-8">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={handleDescriptionBlur}
                            disabled={isPending}
                            placeholder="Add description... (type '/' to open commands or '@' to mention)"
                            className="w-full min-h-[120px] bg-transparent text-neutral-400 placeholder:text-neutral-600 outline-none resize-none text-sm focus:bg-neutral-900 focus:p-2 focus:rounded transition-all disabled:opacity-50"
                        />
                    </div>

                    {/* Action icons */}
                    <div className="flex items-center justify-between py-4 mb-8">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-full"
                            >
                                <CheckCircle className="h-5 w-5" />
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-full"
                        >
                            <Paperclip className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Activity Section */}
                    <div className="border-t border-neutral-800 pt-8">
                        <h3 className="font-semibold text-white text-lg mb-6">Activity</h3>

                        {/* Activity Items */}
                        <div className="space-y-4 mb-6">
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center shrink-0">
                                    <Plus className="h-3 w-3 text-neutral-400" />
                                </div>
                                <div className="flex-1 pt-1">
                                    <p className="text-sm">
                                        <span className="font-semibold text-white">User</span>
                                        <span className="text-neutral-400"> created the card · </span>
                                        <span className="text-neutral-500">just now</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center shrink-0">
                                    <Pencil className="h-3 w-3 text-neutral-400" />
                                </div>
                                <div className="flex-1 pt-1">
                                    <p className="text-sm">
                                        <span className="font-semibold text-white">User</span>
                                        <span className="text-neutral-400"> updated the title to </span>
                                        <span className="font-semibold text-white">{card.title}</span>
                                        <span className="text-neutral-400"> · </span>
                                        <span className="text-neutral-500">1 minute ago</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Comment Input */}
                        <div className="relative">
                            <textarea
                                placeholder="Add a comment..."
                                className="w-full min-h-[100px] px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 outline-none resize-none text-sm focus:border-neutral-700"
                            />
                            <Button
                                size="icon"
                                className="absolute bottom-3 right-3 h-8 w-8 bg-neutral-700 hover:bg-neutral-600 rounded-full"
                            >
                                <span className="text-white text-sm">↑</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-64 border-l border-neutral-800 p-6 space-y-6 bg-neutral-950">
                    {/* List */}
                    <div className="space-y-2">
                        <span className="text-xs text-neutral-500">List</span>
                        <p className="text-sm text-white">{listTitle}</p>
                    </div>

                    {/* Labels */}
                    <div className="space-y-2">
                        <span className="text-xs text-neutral-500">Labels</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-white/70 hover:text-white hover:bg-neutral-800 px-0 h-auto py-1"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add label
                        </Button>
                    </div>

                    {/* Members */}
                    <div className="space-y-2">
                        <span className="text-xs text-neutral-500">Members</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-white/70 hover:text-white hover:bg-neutral-800 px-0 h-auto py-1"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add member
                        </Button>
                    </div>

                    {/* Due date */}
                    <div className="space-y-2">
                        <span className="text-xs text-neutral-500">Due date</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-white/70 hover:text-white hover:bg-neutral-800 px-0 h-auto py-1"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Set due date
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
