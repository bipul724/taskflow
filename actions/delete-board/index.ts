"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Step 1: Define the INPUT schema (what data we need)
const DeleteBoardSchema = z.object({
    boardId: z.string(),
});

// Step 2: Define the TYPES for input and return
export type DeleteBoardInput = z.infer<typeof DeleteBoardSchema>;
export type DeleteBoardReturn = {
    error?: string;
    success?: boolean;
};

// Step 3: The actual server action function
export const deleteBoard = async (data: DeleteBoardInput): Promise<DeleteBoardReturn> => {
    // 3a. Get the current user session
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    // 3b. Check if user is logged in
    if (!session || !session.user) {
        return { error: "Unauthorized" };
    }

    // 3c. Validate the input data
    const validatedFields = DeleteBoardSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors[0]?.message || "Invalid fields" };
    }

    const { boardId } = validatedFields.data;

    try {
        // 3d. Check if the board exists
        const board = await prisma.board.findUnique({
            where: { id: boardId },
        });

        if (!board) {
            return { error: "Board not found" };
        }

        // 3e. Delete the board (lists and cards cascade delete due to schema)
        await prisma.board.delete({
            where: { id: boardId },
        });

    } catch (error) {
        console.error("Failed to delete board:", error);
        return { error: "Failed to delete board." };
    }

    // 3f. Redirect to dashboard after successful deletion
    redirect("/dashboard");
};
