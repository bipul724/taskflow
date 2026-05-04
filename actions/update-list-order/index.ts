"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { UpdateListOrderSchema } from "./schema";
import { z } from "zod";
import { List } from "@/lib/generated/prisma";

export type UpdateListOrderInput = z.infer<typeof UpdateListOrderSchema>;
export type UpdateListOrderReturn = {
    error?: string;
    data?: List[];
};

export const updateListOrder = async (data: UpdateListOrderInput): Promise<UpdateListOrderReturn> => {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session || !session.user) {
        return { error: "Unauthorized" };
    }

    const validation = UpdateListOrderSchema.safeParse(data);

    if (!validation.success) {
        return { error: "Invalid input" };
    }

    const { items, boardId } = validation.data;

    let lists;

    try {
        const transaction = items.map((list) =>
            prisma.list.update({
                where: {
                    id: list.id,
                    boardId: boardId // Add safety check
                },
                data: {
                    order: list.order,
                },
            })
        );
        lists = await prisma.$transaction(transaction);
    } catch (error) {
        return { error: "Failed to reorder lists." }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: lists };
};
