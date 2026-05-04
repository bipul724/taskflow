"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreateBoardSchema } from "./schema";
import { InputType, ReturnType } from "./types";
import { hasAvailableCount } from "@/lib/org-limit";

export const createBoard = async (data: InputType): Promise<ReturnType> => {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session || !session.user) {
        return {
            error: "Unauthorized",
        };
    }

    const { title, image } = data;

    // ... (rest of image processing)
    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] = image.split("|");

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
            error: "Missing fields. Failed to create board."
        };
    }

    let board;

    try {
        // 1. Ensure user has a workspace. For now, we'll try to find one or create a personal one.
        const membership = await prisma.orgMembership.findFirst({
            where: { userId: session.user.id },
            include: { workspace: true }
        });

        let workspaceId = membership?.workspaceId;

        if (!workspaceId) {
            const workspace = await prisma.workspace.create({
                data: {
                    name: `${session.user.name}'s Workspace`,
                    slug: `${session.user.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 5)}`,
                    members: {
                        create: {
                            userId: session.user.id,
                            role: "ADMIN"
                        }
                    }
                }
            });
            workspaceId = workspace.id;
        }

        const canCreate = await hasAvailableCount(workspaceId);

        if (!canCreate) {
            return {
                error: "You have reached your limit of free boards. Please upgrade your plan to create more."
            };
        }

        board = await prisma.board.create({
            data: {
                title,
                workspaceId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML,
            }
        });

    } catch (error) {
        console.error("Database Error:", error);
        return {
            error: "Failed to create board."
        }
    }

    revalidatePath(`/board/${board.id}`);
    revalidatePath("/dashboard");

    return { data: board };
};
