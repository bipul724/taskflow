import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Zap } from "lucide-react";

export default function MembersPage() {
    return (
        <div className="flex min-h-screen bg-[#0a0a0a]">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col">
                <div className="flex-1 pt-16 md:pt-14 pb-8 px-4 md:pr-8 md:pl-28 text-white max-w-5xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold">Members</h1>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                            {/* Launch offer badge */}
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d2a1f] border border-[#1a4d33] text-[#34d399] text-xs font-medium">
                                <Zap size={12} className="fill-[#34d399]" />
                                Launch offer: Get unlimited members with Pro
                            </div>

                            <span className="text-sm text-gray-500 font-medium">Free Plan</span>

                            <Button className="bg-white text-black hover:bg-gray-200 gap-2 font-medium h-9">
                                <Plus size={16} />
                                Invite
                            </Button>
                        </div>
                    </div>

                    {/* Members Table */}
                    <div className="rounded-lg border border-[#333333] overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center px-6 py-3 bg-[#1a1a1a] border-b border-[#333333] text-sm font-medium text-gray-500">
                            <div className="flex-1">User</div>
                            <div className="w-32">Role</div>
                        </div>

                        {/* Rows */}
                        <div className="flex items-center px-6 py-4 bg-[#0a0a0a] border-b border-[#333333] last:border-0 hover:bg-[#111111] transition-colors">
                            <div className="flex-1 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#4f8e36] flex items-center justify-center text-white font-medium">
                                    K
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Kiyotaka Ayanokoji</p>
                                    <p className="text-xs text-gray-500">ayanokojik276@gmail.com</p>
                                </div>
                            </div>
                            <div className="w-32">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[#1a4d33] text-[#34d399]">
                                    Admin
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
