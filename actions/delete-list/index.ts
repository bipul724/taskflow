"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const DeleteListSchema = z.object({
    listId: z.string(),
    boardId: z.string(),
});

export type DeleteListInput = z.infer<typeof DeleteListSchema>;
export type DeleteListReturn = {
    error?: string;
    success?: boolean;
};

export const deleteList = async (data: DeleteListInput): Promise<DeleteListReturn> => {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session || !session.user) {
        return { error: "Unauthorized" };
    }

    const validatedFields = DeleteListSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors[0]?.message || "Invalid fields" };
    }

    const { listId, boardId } = validatedFields.data;

    try {
        // Verify the list exists
        const list = await prisma.list.findUnique({
            where: { id: listId },
        });

        if (!list) {
            return { error: "List not found" };
        }

        // Delete the list (cards will be cascade deleted due to schema)
        await prisma.list.delete({
            where: { id: listId },
        });

    } catch (error) {
        console.error("Failed to delete list:", error);
        return { error: "Failed to delete list." };
    }

    revalidatePath(`/board/${boardId}`);
    return { success: true };
};
