"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteAccountAction() {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.user.delete({
            where: {
                id: session.user.id,
            },
        });

        // Use better-auth's signOut API to clear the session cookie
        await auth.api.signOut({
            headers: headersList
        });

    } catch (error) {
        console.error("Failed to delete account:", error);
        return { error: "Failed to delete account" };
    }

    redirect("/auth/register");
}
