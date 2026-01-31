"use client";

import { List, Card } from "@/lib/generated/prisma";
import { ListItem } from "./list-item";
import { useEffect, useState } from "react";

type ListWithCards = List & { cards: Card[] };

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

export const ListContainer = ({
    data,
    boardId,
}: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data);

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    return (
        <ol className="flex gap-x-3 h-full">
            {orderedData.map((list, index) => {
                return (
                    <ListItem
                        key={list.id}
                        index={index}
                        data={list}
                        boardId={boardId}
                    />
                )
            })}
            <div className="flex-shrink-0 w-1" />
        </ol>
    );
};
