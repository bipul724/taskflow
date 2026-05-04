'use client'

import { Board } from "@/lib/generated/prisma";
import { Button } from "@/components/ui/button";
import { CreateListPopover } from "@/components/form/create-list-popover";
import { DeleteBoardButton } from "@/components/delete-board-button";
import { Filter, Eye, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface BoardNavbarProps {
    data: Board;
}

export const BoardNavbar = ({ data }: BoardNavbarProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    }

    const clearFilters = () => {
        startTransition(() => {
            router.replace(pathname);
        });
    }

    const hasFilters = searchParams.get('cardQuery') || searchParams.get('status') || searchParams.get('priority');

    return (
        <div className="w-full h-14 z-[40] bg-black/40 backdrop-blur-sm fixed top-14 flex items-center justify-between pl-6 pr-6 gap-x-4 text-white">
            <div className="flex items-center gap-x-4 shrink-0">
                <div className="font-bold text-lg whitespace-nowrap">
                    {data.title}
                </div>
                
                <div className="relative max-w-xs hidden md:block">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                    <Input 
                        placeholder="Search cards..."
                        className="h-8 pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30"
                        defaultValue={searchParams.get('cardQuery') || ""}
                        onChange={(e) => updateFilter('cardQuery', e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center gap-x-2 shrink-0">
                <Button variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white h-auto py-1.5 px-2 text-xs font-normal hidden lg:flex truncate max-w-[200px]">
                    taskflow / {data.title}
                </Button>

                <div className="w-px h-6 bg-white/20 mx-1 hidden lg:block" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className={`bg-white/10 hover:bg-white/20 text-white shrink-0 ${hasFilters ? 'border-sky-500 border' : ''}`}>
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-[#1a1a1a] border-[#333333] text-white">
                        <DropdownMenuLabel>Filter Cards</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-[#333333]" />
                        
                        <DropdownMenuLabel className="text-xs text-gray-400 font-normal">Status</DropdownMenuLabel>
                        <DropdownMenuRadioGroup value={searchParams.get('status') || "all"} onValueChange={(val) => updateFilter('status', val)}>
                            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="PENDING">Pending</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="COMPLETED">Completed</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        
                        <DropdownMenuSeparator className="bg-[#333333]" />
                        
                        <DropdownMenuLabel className="text-xs text-gray-400 font-normal">Priority</DropdownMenuLabel>
                        <DropdownMenuRadioGroup value={searchParams.get('priority') || "all"} onValueChange={(val) => updateFilter('priority', val)}>
                            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="HIGH">High</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="MODERATE">Moderate</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="LOW">Low</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>

                        {hasFilters && (
                            <>
                                <DropdownMenuSeparator className="bg-[#333333]" />
                                <DropdownMenuItem onClick={clearFilters} className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer">
                                    <X className="h-4 w-4 mr-2" />
                                    Clear all filters
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="w-px h-6 bg-white/20 mx-2" />

                <CreateListPopover boardId={data.id}>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90 shrink-0">
                        + New list
                    </Button>
                </CreateListPopover>

                <DeleteBoardButton boardId={data.id} />
            </div>
        </div>
    );
};