"use client";

import { useState } from "react";

import { List, Card } from "@/lib/generated/prisma";
import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";

interface ListItemProps {
    index: number;
    data: List & { cards: Card[] };
    boardId: string;
}

export const ListItem = ({ index, data, boardId }: ListItemProps) => {
    const [isCardFormOpen, setIsCardFormOpen] = useState(false);

    const handleAddCard = () => {
        setIsCardFormOpen(true);
    };

    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <div className="w-full rounded-md bg-black/80 shadow-md pb-2 text-white">
                <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
                    <ListHeader
                        data={data}
                        boardId={boardId}
                        onAddCard={handleAddCard}
                    />
                </div>
                {/* Cards */}
                <div className="mx-1 px-1 pt-2 flex flex-col gap-y-2">
                    {data.cards.length > 0 ? (
                        data.cards.map((card, cardIndex) => (
                            <CardItem key={card.id} index={cardIndex} data={card} listTitle={data.title} />
                        ))
                    ) : null}
                </div>
                {/* Hidden CardForm dialog - triggered by header buttons */}
                <CardForm
                    listId={data.id}
                    boardId={boardId}
                    open={isCardFormOpen}
                    onOpenChange={setIsCardFormOpen}
                    hideTrigger
                />
            </div>
        </li>
    );
};
