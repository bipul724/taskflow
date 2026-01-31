"use client";

import { useState, useRef, ElementRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { List } from "@/lib/generated/prisma";
import { useEventListener } from "usehooks-ts";
import { Plus, MoreHorizontal, LayoutGrid, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteList } from "@/actions/delete-list";

interface ListHeaderProps {
    data: List;
    boardId: string;
    onAddCard: () => void;
}

export const ListHeader = ({ data, boardId, onAddCard }: ListHeaderProps) => {
    const router = useRouter();
    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);
    const [isPending, startTransition] = useTransition();

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            formRef.current?.requestSubmit();
        }
    };

    useEventListener("keydown", onKeyDown);

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        if (title === data.title) {
            return disableEditing();
        }

        setTitle(title); // Optimistic update
        disableEditing();

        // Server action to update list title would go here
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    const handleDeleteList = () => {
        startTransition(async () => {
            const result = await deleteList({
                listId: data.id,
                boardId: boardId,
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("List deleted!");
                router.refresh();
            }
        });
    };

    return (
        <div className="flex items-center justify-between w-full">
            {isEditing ? (
                <form
                    ref={formRef}
                    action={onSubmit}
                    className="flex-1 px-[2px]"
                >
                    <FormInput
                        ref={inputRef}
                        onBlur={onBlur}
                        id="title"
                        placeholder="Enter list title.."
                        defaultValue={title}
                        className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-neutral-700 focus:border-neutral-700 transition truncate bg-transparent focus:bg-neutral-800 text-white placeholder:text-neutral-400"
                    />
                    <button type="submit" hidden />
                </form>
            ) : (
                <div
                    onClick={enableEditing}
                    className="flex-1 text-sm px-2.5 py-1 h-7 font-medium border-transparent cursor-pointer"
                >
                    {title}
                </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-1">
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddCard();
                    }}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-neutral-400 hover:text-white hover:bg-white/10"
                >
                    <Plus className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-neutral-400 hover:text-white hover:bg-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-48 bg-neutral-900 border-neutral-700 text-white"
                    >
                        <DropdownMenuItem
                            onClick={onAddCard}
                            className="cursor-pointer hover:bg-neutral-800 focus:bg-neutral-800"
                        >
                            <LayoutGrid className="h-4 w-4 mr-2" />
                            Add a card
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleDeleteList}
                            disabled={isPending}
                            className="cursor-pointer text-red-400 hover:bg-neutral-800 focus:bg-neutral-800 focus:text-red-400"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete list
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};
