"use client";

import { List, Card } from "@/lib/generated/prisma";
import { ListItem } from "./list-item";
import { useEffect, useState, useMemo } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

type ListWithCards = List & { cards: Card[] };

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

export const ListContainer = ({
    data,
    boardId,
}: ListContainerProps) => {
    const searchParams = useSearchParams();
    const cardQuery = searchParams.get("cardQuery")?.toLowerCase();
    const statusFilter = searchParams.get("status");
    const priorityFilter = searchParams.get("priority");

    const [orderedData, setOrderedData] = useState(data);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    const filteredData = useMemo(() => {
        if (!cardQuery && !statusFilter && !priorityFilter) return orderedData;

        return orderedData.map((list) => ({
            ...list,
            cards: list.cards.filter((card) => {
                const matchesQuery = !cardQuery || card.title.toLowerCase().includes(cardQuery) || card.description?.toLowerCase().includes(cardQuery);
                const matchesStatus = !statusFilter || card.status === statusFilter;
                const matchesPriority = !priorityFilter || card.priority === priorityFilter;

                return matchesQuery && matchesStatus && matchesPriority;
            }),
        }));
    }, [orderedData, cardQuery, statusFilter, priorityFilter]);

    if (!isMounted) return null;

    const isFiltering = !!(cardQuery || statusFilter || priorityFilter);

    const onDragEnd = (result: any) => {
        if (isFiltering && result.type === "card") {
            toast.error("Drag and drop is disabled while filters are active.");
            return;
        }

        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === "list") {
            const items = Array.from(orderedData);
            const [reorderedItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, reorderedItem);

            const updatedItems = items.map((item, index) => ({
                ...item,
                order: index
            }));

            setOrderedData(updatedItems);
            
            toast.promise(updateListOrder({ items: updatedItems, boardId }), {
                loading: 'Reordering lists...',
                success: 'Lists reordered!',
                error: 'Failed to reorder lists.',
            });
        }

        if (type === "card") {
            const newOrderedData = [...orderedData];

            const sourceList = newOrderedData.find(list => list.id === source.droppableId);
            const destList = newOrderedData.find(list => list.id === destination.droppableId);

            if (!sourceList || !destList) {
                return;
            }

            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            if (!destList.cards) {
                destList.cards = [];
            }

            if (source.droppableId === destination.droppableId) {
                const reorderedCards = Array.from(sourceList.cards);
                const [movedCard] = reorderedCards.splice(source.index, 1);
                reorderedCards.splice(destination.index, 0, movedCard);

                const updatedCards = reorderedCards.map((card, index) => ({
                    ...card,
                    order: index,
                }));

                sourceList.cards = updatedCards;
                setOrderedData(newOrderedData);
                
                toast.promise(updateCardOrder({
                    items: updatedCards,
                    boardId: boardId,
                }), {
                   loading: 'Reordering cards...',
                   success: 'Cards reordered!',
                   error: 'Failed to reorder cards.',
                });
            } else {
                const [movedCard] = sourceList.cards.splice(source.index, 1);
                movedCard.listId = destination.droppableId;
                destList.cards.splice(destination.index, 0, movedCard);

                sourceList.cards.forEach((card, idx) => {
                    card.order = idx;
                });

                destList.cards.forEach((card, idx) => {
                    card.order = idx;
                });

                setOrderedData(newOrderedData);

                toast.promise(updateCardOrder({
                    items: [...sourceList.cards, ...destList.cards],
                    boardId: boardId,
                }), {
                   loading: 'Moving card...',
                   success: 'Card moved!',
                   error: 'Failed to move card.',
                });
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                    <ol 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-x-3 h-full"
                    >
                        {filteredData.map((list, index) => {
                            return (
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    data={list}
                                    boardId={boardId}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <div className="flex-shrink-0 w-1" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    );
};
