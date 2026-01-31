"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreateListSchema } from "./schema";
import { InputType, ReturnType } from "./types";

export const createList = async (data: InputType): Promise<ReturnType> => {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session || !session.user) {
        return {
            error: "Unauthorized",
        };
    }

    const validation = CreateListSchema.safeParse(data);

    if (!validation.success) {
        return {
            error: "Invalid input",
        };
    }

    const { title, boardId } = validation.data;

    let list;

    try {
        const board = await prisma.board.findUnique({
            where: {
                id: boardId,
            }
        });

        if (!board) {
            return {
                error: "Board not found",
            };
        }

        // Logic to check if user has access to this board (via Workspace)
        // could be added here for better security.

        const lastList = await prisma.list.findFirst({
            where: { boardId: boardId },
            orderBy: { order: "desc" },
            select: { order: true }
        });

        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await prisma.list.create({
            data: {
                title,
                boardId,
                order: newOrder,
            }
        });

    } catch (error) {
        return {
            error: "Failed to create list."
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: list };
};
