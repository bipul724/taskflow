import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { Plus, LayoutTemplate } from "lucide-react";

export default function TemplatesPage() {
    return (
        <div className="flex min-h-screen bg-[#0a0a0a]">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col">
                <div className="flex-1 pt-16 md:pt-14 pb-8 px-4 md:pr-8 md:pl-28 text-white max-w-5xl h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">Templates</h1>
                        <Button className="bg-white text-black hover:bg-gray-200 gap-2 font-medium h-9">
                            <Plus size={16} />
                            New
                        </Button>
                    </div>

                    {/* Empty State */}
                    <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] border border-[#333333] flex items-center justify-center mb-2">
                                <LayoutTemplate size={32} className="text-gray-400" />
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-lg font-medium text-white">No templates</h3>
                                <p className="text-sm text-gray-500 max-w-sm">
                                    Get started by creating a new template
                                </p>
                            </div>

                            <div className="pt-2">
                                <Button className="bg-white text-black hover:bg-gray-200 font-medium">
                                    Create new template
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
