"use client";

import { useRef, ElementRef, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { createList } from "@/actions/create-list";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";

interface CreateListPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    boardId: string;
}

export const CreateListPopover = ({
    children,
    side = "bottom",
    align,
    sideOffset = 0,
    boardId,
}: CreateListPopoverProps) => {
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);

    const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        try {
            const res = await createList({ title, boardId });

            if (res.error) {
                toast.error(res.error);
            } else if (res.data) {
                toast.success("List created!");
                closeRef.current?.click();
                router.refresh();
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create list
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormInput
                            id="title"
                            label="List title"
                            type="text"
                            errors={fieldErrors}
                        />
                        <input hidden value={boardId} name="boardId" readOnly />
                    </div>
                    <FormSubmit className="w-full">Create list</FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
