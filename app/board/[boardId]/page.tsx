import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ListContainer } from "@/components/list-container";
import { BoardNavbar } from "@/components/board-navbar";

interface BoardIdPageProps {
    params: Promise<{
        boardId: string;
    }>;
}

const BoardIdPage = async (props: BoardIdPageProps) => {
    // Await params as per Next.js 15+ async params requirement if applicable, 
    // or just good practice for future compat.
    const params = await props.params;

    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session || !session.user) {
        redirect("/auth/login");
    }

    const { boardId } = params;

    const board = await prisma.board.findUnique({
        where: {
            id: boardId,
        },
        include: {
            lists: {
                orderBy: {
                    order: "asc",
                },
                include: {
                    cards: {
                        orderBy: {
                            order: "asc",
                        },
                    },
                },
            },
        },
    });

    if (!board) {
        redirect("/dashboard");
    }

    return (
        <div className="h-full">
            <div className="flex h-screen">
                <DashboardSidebar />
                <div
                    className="relative flex-1 flex flex-col overflow-hidden bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url(${board.imageFullUrl})` }}
                >
                    {/* Overlay - only on content area */}
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    <BoardNavbar data={board} />
                    <main className="relative flex-1 overflow-x-auto overflow-y-hidden pt-36 pb-10 px-6">
                        <ListContainer
                            boardId={boardId}
                            data={board.lists}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default BoardIdPage;
