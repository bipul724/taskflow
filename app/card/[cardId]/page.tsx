import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { CardDetailView } from "@/components/card-detail-view";

interface CardPageProps {
    params: Promise<{
        cardId: string;
    }>;
}

const CardPage = async (props: CardPageProps) => {
    const params = await props.params;

    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session || !session.user) {
        redirect("/auth/login");
    }

    const { cardId } = params;

    const card = await prisma.card.findUnique({
        where: {
            id: cardId,
        },
        include: {
            list: {
                include: {
                    board: true,
                },
            },
        },
    });

    if (!card) {
        notFound();
    }

    return (
        <div className="h-screen flex bg-neutral-950">
            <DashboardSidebar />
            <div className="flex-1 overflow-auto">
                <CardDetailView
                    card={card}
                    listTitle={card.list.title}
                    boardTitle={card.list.board.title}
                    boardId={card.list.board.id}
                />
            </div>
        </div>
    );
};

export default CardPage;
