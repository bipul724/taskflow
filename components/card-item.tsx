"use client";

import Link from "next/link";
import { Card } from "@/lib/generated/prisma";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
    data: Card;
    index: number;
    listTitle: string;
}

export const CardItem = ({ data, index, listTitle }: CardItemProps) => {
    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Link href={`/card/${data.id}`}>
                        <div
                            role="button"
                            className="bg-neutral-900 border-2 border-transparent hover:border-white/20 py-2 px-3 text-sm rounded-md shadow-sm cursor-pointer text-white transition-colors"
                        >
                            {data.title}
                        </div>
                    </Link>
                </div>
            )}
        </Draggable>
    );
};
