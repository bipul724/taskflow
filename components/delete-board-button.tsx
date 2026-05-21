"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteBoard } from "@/actions/delete-board";

interface DeleteBoardButtonProps {
    boardId: string;
}

export const DeleteBoardButton = ({ boardId }: DeleteBoardButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        // Confirm before deleting
        const confirmed = window.confirm(
            "Are you sure you want to delete this board? This will delete all lists and cards inside it."
        );

        if (!confirmed) return;

        setIsLoading(true);

        try {
            const result = await deleteBoard({ boardId });

            if (result?.error) {
                alert(result.error);
            }
            // If successful, the action redirects to /dashboard
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleDelete}
            disabled={isLoading}
            variant="ghost"
            size="sm"
            className="bg-red-500/80 hover:bg-red-600 text-white shrink-0"
        >
            <Trash2 className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">{isLoading ? "Deleting..." : "Delete Board"}</span>
        </Button>
    );
};
