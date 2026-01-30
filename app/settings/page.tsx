import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SettingsForm } from "@/components/settings-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SettingsPage() {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session) {
        redirect("/auth/login");
    }

    const tabs = [
        { name: "Account", href: "/settings", active: true },
        { name: "Workspace", href: "/settings/workspace", active: false },
        { name: "Billing", href: "/settings/billing", active: false },
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

                    <SettingsForm user={session.user} />
                </div>
            </div>
        </div>
    );
}
