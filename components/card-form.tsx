"use client";

import { Plus, X } from "lucide-react";
import { useState, useRef, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { createCard } from "@/actions/create-card";

interface CardFormProps {
    listId: string;
    boardId: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    hideTrigger?: boolean;
}

export const CardForm = ({ listId, boardId, open: controlledOpen, onOpenChange, hideTrigger }: CardFormProps) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    // Use controlled state if provided, otherwise use internal state
    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setOpen = onOpenChange || setInternalOpen;

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        startTransition(async () => {
            const result = await createCard({
                title,
                description,
                listId,
                boardId,
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Card created!");
                formRef.current?.reset();
                setOpen(false);
                router.refresh();
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            {!hideTrigger && (
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 px-2 py-1.5"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add a card
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="bg-neutral-900 border-neutral-700 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">New card</DialogTitle>
                </DialogHeader>
                <form ref={formRef} action={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <FormInput
                            id="title"
                            placeholder="Card title"
                            className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-neutral-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <textarea
                            name="description"
                            placeholder="Add description... (type '/' to open commands or '@' to mention)"
                            className="w-full min-h-[100px] px-3 py-2 bg-neutral-800 border border-neutral-600 rounded-md text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 resize-none text-sm"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="bg-neutral-800 border-neutral-600 text-white hover:bg-neutral-700"
                        >
                            {listId.slice(0, 4)}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="bg-neutral-800 border-neutral-600 text-white hover:bg-neutral-700"
                        >
                            Members
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="bg-neutral-800 border-neutral-600 text-white hover:bg-neutral-700"
                        >
                            Labels
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="bg-neutral-800 border-neutral-600 text-white hover:bg-neutral-700"
                        >
                            Due date
                        </Button>
                    </div>
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-neutral-700">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-neutral-400">Create another</span>
                            <input
                                type="checkbox"
                                name="createAnother"
                                className="w-4 h-4 rounded bg-neutral-800 border-neutral-600"
                            />
                        </div>
                        <FormSubmit
                            className="bg-white text-black hover:bg-white/90"
                            disabled={isPending}
                        >
                            Create card
                        </FormSubmit>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
