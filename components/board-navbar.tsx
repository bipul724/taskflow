import { Board } from "@/lib/generated/prisma";
import { Button } from "@/components/ui/button";
import { CreateListPopover } from "@/components/form/create-list-popover";
import { Filter, Eye } from "lucide-react";

interface BoardNavbarProps {
    data: Board;
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
    return (
        <div className="w-full h-14 z-[40] bg-black/40 backdrop-blur-sm fixed top-14 flex items-center justify-between pl-6 pr-72 gap-x-4 text-white">
            <div className="flex items-center gap-x-4 shrink-0">
                <div className="font-bold text-lg">
                    {data.title}
                </div>
            </div>

            <div className="flex items-center gap-x-2 shrink-0">
                {/* Breadcrumb link */}
                <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white h-auto py-1.5 px-2 text-xs font-normal hidden lg:flex truncate max-w-[200px]">
                    taskflow / {data.title}
                </Button>

                <div className="w-px h-6 bg-white/20 mx-1 hidden lg:block" />

                <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white shrink-0">
                    <Eye className="h-4 w-4 mr-2" />
                    Visibility
                </Button>

                <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white shrink-0">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>

                <div className="w-px h-6 bg-white/20 mx-2" />

                <CreateListPopover boardId={data.id}>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90 shrink-0">
                        + New list
                    </Button>
                </CreateListPopover>
            </div>
        </div>
    );
};