"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { Card } from "@/lib/generated/prisma";

// Schema for card creation
const CreateCardSchema = z.object({
    title: z
        .string({
            required_error: "Title is required",
            invalid_type_error: "Title is required",
        })
        .min(1, {
            message: "Title is too short",
        }),
    description: z.string().optional(),
    listId: z.string(),
    boardId: z.string(),
});

export type CreateCardInput = z.infer<typeof CreateCardSchema>;
export type CreateCardReturn = {
    error?: string;
    data?: Card;
};

export const createCard = async (data: CreateCardInput): Promise<CreateCardReturn> => {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session || !session.user) {
        return { error: "Unauthorized" };
    }

    const validatedFields = CreateCardSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: validatedFields.error.errors[0]?.message || "Invalid fields" };
    }

    const { title, description, listId, boardId } = validatedFields.data;

    let card;

    try {
        // Verify the list exists
        const list = await prisma.list.findUnique({
            where: { id: listId },
        });

        if (!list) {
            return { error: "List not found" };
        }

        // Get the last card order
        const lastCard = await prisma.card.findFirst({
            where: { listId: listId },
            orderBy: { order: "desc" },
            select: { order: true },
        });

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        // Create the card
        card = await prisma.card.create({
            data: {
                title,
                description: description || null,
                listId,
                order: newOrder,
            },
        });

    } catch (error) {
        console.error("Failed to create card:", error);
        return { error: "Failed to create card." };
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card };
};
