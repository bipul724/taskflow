"use client";

import { useState } from "react";
import { X, MoreHorizontal, Plus, Paperclip, CheckCircle } from "lucide-react";

import { Card } from "@/lib/generated/prisma";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CardModalProps {
    data: Card;
    listTitle: string;
    open: boolean;
    onClose: () => void;
}

export const CardModal = ({ data, listTitle, open, onClose }: CardModalProps) => {
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description || "");

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-4xl p-0 gap-0 overflow-hidden">
                {/* Header */}
                <DialogHeader className="px-6 py-4 border-b border-neutral-700">
                    <DialogTitle className="sr-only">{data.title}</DialogTitle>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-neutral-400">
                            <span>Workspace</span>
                            <span>›</span>
                            <span>{listTitle}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-400 hover:text-white hover:bg-neutral-800"
                        >
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="flex">
                    {/* Main Content */}
                    <div className="flex-1 p-6 space-y-6">
                        {/* Title */}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-xl font-semibold bg-transparent border-none outline-none w-full text-white"
                        />

                        {/* Description */}
                        <div className="space-y-2">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add description... (type '/' to open commands or '@' to mention)"
                                className="w-full min-h-[100px] px-3 py-2 bg-transparent text-neutral-400 placeholder:text-neutral-500 outline-none resize-none text-sm"
                            />
                        </div>

                        {/* Action icons */}
                        <div className="flex items-center justify-between py-4">
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
                        <div className="space-y-4 border-t border-neutral-700 pt-6">
                            <h3 className="font-semibold text-white">Activity</h3>

                            {/* Activity Item */}
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center">
                                    <Plus className="h-3 w-3 text-neutral-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm">
                                        <span className="font-semibold text-white">User</span>
                                        <span className="text-neutral-400"> created the card · </span>
                                        <span className="text-neutral-500">just now</span>
                                    </p>
                                </div>
                            </div>

                            {/* Comment Input */}
                            <div className="relative mt-4">
                                <textarea
                                    placeholder="Add a comment..."
                                    className="w-full min-h-[80px] px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 outline-none resize-none text-sm"
                                />
                                <Button
                                    size="icon"
                                    className="absolute bottom-3 right-3 h-8 w-8 bg-neutral-700 hover:bg-neutral-600 rounded-full"
                                >
                                    <span className="text-white text-xs">↑</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-56 border-l border-neutral-700 p-4 space-y-4 bg-neutral-900/50">
                        {/* List */}
                        <div className="space-y-1">
                            <span className="text-xs text-neutral-500">List</span>
                            <p className="text-sm text-white">{listTitle}</p>
                        </div>

                        {/* Labels */}
                        <div className="space-y-1">
                            <span className="text-xs text-neutral-500">Labels</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-white/70 hover:text-white hover:bg-neutral-800 px-0"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add label
                            </Button>
                        </div>

                        {/* Members */}
                        <div className="space-y-1">
                            <span className="text-xs text-neutral-500">Members</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-white/70 hover:text-white hover:bg-neutral-800 px-0"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add member
                            </Button>
                        </div>

                        {/* Due date */}
                        <div className="space-y-1">
                            <span className="text-xs text-neutral-500">Due date</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-white/70 hover:text-white hover:bg-neutral-800 px-0"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Set due date
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
