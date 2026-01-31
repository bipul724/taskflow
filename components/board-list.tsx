import Link from "next/link";
import { User } from "lucide-react";

import { Board } from "@/lib/generated/prisma";

interface BoardListProps {
    boards: Board[];
}

export function BoardList({ boards }: BoardListProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {boards.map((board) => (
                <Link
                    key={board.id}
                    href={`/board/${board.id}`}
                    className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                    style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                >
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                    <p className="relative font-semibold text-white">
                        {board.title}
                    </p>
                </Link>
            ))}
            {/* Create new board skeleton/button could be added here too */}
        </div>
    );
}
