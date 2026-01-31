import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function BillingSettingsPage() {
    const tabs = [
        { name: "Account", href: "/settings", active: false },
        { name: "Workspace", href: "/settings/workspace", active: false },
        { name: "Billing", href: "/settings/billing", active: true },
        { name: "API", href: "/settings/api", active: false },
        { name: "Integrations", href: "/settings/integrations", active: false },
    ];

    return (
        <div className="flex min-h-screen bg-[#0a0a0a]">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col">
                <div className="flex-1 pt-14 pb-8 pr-8 pl-28 text-white max-w-4xl">
                    <h1 className="text-2xl font-bold mb-6">Settings</h1>

                    {/* Tabs */}
                    <div className="flex border-b border-[#333333] mb-8">
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

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-base font-medium mb-1">Billing</h2>
                            <p className="text-sm text-gray-500">View and manage your billing and subscription.</p>
                        </div>

                        <Button asChild className="bg-white text-black hover:bg-gray-200 gap-2 font-medium">
                            <Link href="/pricing">
                                Billing portal
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
