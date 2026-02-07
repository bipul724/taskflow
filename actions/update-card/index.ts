"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { Card } from "@/lib/generated/prisma";

const UpdateCardSchema = z.object({
    cardId: z.string(),
    boardId: z.string(),
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    status: z.enum(["PENDING", "COMPLETED"]).optional(),
    priority: z.enum(["HIGH", "MODERATE", "LOW"]).nullable().optional(),
    dueDate: z.string().nullable().optional(), // ISO date string
    assignedToId: z.string().nullable().optional(),
});

export type UpdateCardInput = z.infer<typeof UpdateCardSchema>;
export type UpdateCardReturn = {
    error?: string;
    data?: Card;
};

export const updateCard = async (data: UpdateCardInput): Promise<UpdateCardReturn> => {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session || !session.user) {
        return { error: "Unauthorized" };
    }

    const validatedFields = UpdateCardSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors[0]?.message || "Invalid fields" };
    }

    const { cardId,
        boardId,
        title,
        description,
        status,
        priority,
        dueDate,
        assignedToId } = validatedFields.data;

    let card: Card;

    try {
        // Verify the card exists
        const existingCard = await prisma.card.findUnique({
            where: { id: cardId },
        });

        if (!existingCard) {
            return { error: "Card not found" };
        }

        // Update the card
        card = await prisma.card.update({
            where: { id: cardId },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(status !== undefined && { status }),
                ...(priority !== undefined && { priority }),
                ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
                ...(assignedToId !== undefined && { assignedToId }),
            },
        });

    } catch (error) {
        console.error("Failed to update card:", error);
        return { error: "Failed to update card." };
    }

    revalidatePath(`/board/${boardId}`);
    revalidatePath(`/card/${cardId}`);
    return { data: card };
};
