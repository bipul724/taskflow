"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdateCardOrderSchema } from "./schema";
import { z } from "zod";
import { Card } from "@/lib/generated/prisma";

export type UpdateCardOrderInput = z.infer<typeof UpdateCardOrderSchema>;
export type UpdateCardOrderReturn = {
    error?: string;
    data?: Card[];
};

export const updateCardOrder = async (data: UpdateCardOrderInput): Promise<UpdateCardOrderReturn> => {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session || !session.user) {
        return { error: "Unauthorized" };
    }

    const validation = UpdateCardOrderSchema.safeParse(data);

    if (!validation.success) {
        return { error: "Invalid input" };
    }

    const { items, boardId } = validation.data;

    let cards;

    try {
        const transaction = items.map((card) =>
            prisma.card.update({
                where: {
                    id: card.id,
                },
                data: {
                    order: card.order,
                    listId: card.listId,
                },
            })
        );
        cards = await prisma.$transaction(transaction);
    } catch (error) {
        return { error: "Failed to reorder cards." }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: cards };
};
