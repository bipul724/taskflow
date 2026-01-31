"use client";

import { Plus, X } from "lucide-react";
import { useState, useRef, ElementRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { createList } from "@/actions/create-list";

export const ListForm = ({
    boardId
}: {
    boardId: string;
}) => {
    const router = useRouter();
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        try {
            const res = await createList({ title, boardId });

            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success(`List "${title}" created`);
                disableEditing();
                router.refresh();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    if (isEditing) {
        return (
            <li className="shrink-0 h-full w-[272px] select-none">
                <form
                    action={onSubmit}
                    ref={formRef}
                    className="w-full p-3 rounded-md bg-black/80 space-y-4 shadow-md"
                >
                    <FormInput
                        ref={inputRef}
                        id="title"
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-neutral-700 focus:border-neutral-700 transition bg-neutral-800 text-white placeholder:text-neutral-400"
                        placeholder="Enter list title..."
                    />
                    <input hidden value={boardId} name="boardId" readOnly />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>
                            Add list
                        </FormSubmit>
                        <Button
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                            className="text-white/50 hover:text-white hover:bg-white/10"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </li>
        );
    }

    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <button
                onClick={enableEditing}
                className="w-full rounded-md bg-white/10 hover:bg-white/20 text-white transition p-3 flex items-center font-medium text-sm"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add a list
            </button>
        </li>
    );
};
