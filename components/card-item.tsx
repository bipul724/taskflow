"use client";

import Link from "next/link";
import { Card } from "@/lib/generated/prisma";

interface CardItemProps {
    data: Card;
    index: number;
    listTitle: string;
}

export const CardItem = ({ data, index, listTitle }: CardItemProps) => {
    return (
        <Link href={`/card/${data.id}`}>
            <div
                role="button"
                className="truncate border-2 border-transparent hover:border-white/20 py-2 px-3 text-sm bg-neutral-900 rounded-md shadow-sm cursor-pointer text-white transition-colors"
            >
                {data.title}
            </div>
        </Link>
    );
};

