import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { WorkspaceSettingsForm } from "@/components/workspace-settings-form";
import Link from "next/link";

export default function WorkspaceSettingsPage() {
    const tabs = [
        { name: "Account", href: "/settings", active: false },
        { name: "Workspace", href: "/settings/workspace", active: true },
        { name: "Billing", href: "/settings/billing", active: false },
        { name: "API", href: "/settings/api", active: false },
        { name: "Integrations", href: "/settings/integrations", active: false },
    ];

    return (
        <div className="flex min-h-screen bg-[#0a0a0a]">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col">
                <div className="flex-1 pt-16 md:pt-14 pb-8 px-4 md:pr-8 md:pl-28 text-white max-w-4xl">
                    <h1 className="text-2xl font-bold mb-6">Settings</h1>

                    {/* Tabs */}
                    <div className="flex border-b border-[#333333] mb-8 overflow-x-auto">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`pb-3 px-1 mr-6 text-sm font-medium border-b-2 transition-colors ${tab.active
                                    ? "border-white text-white"
                                    : "border-transparent text-gray-500 hover:text-gray-300"
                                    }`}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </div>

                    <WorkspaceSettingsForm />
                </div>
            </div>
        </div>
    );
}
