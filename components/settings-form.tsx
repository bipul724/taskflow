"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
    user: {
        name: string;
        image?: string | null;
    };
}

export function SettingsForm({ user }: SettingsFormProps) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleUpdateProfile(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget);
        const name = String(formData.get("name"));

        if (!name) return;

        await updateUser({
            name,
            fetchOptions: {
                onRequest: () => setIsPending(true),
                onResponse: () => setIsPending(false),
                onSuccess: () => {
                    toast.success("Profile updated successfully");
                    router.refresh();
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                }
            },
        });
    }

    return (
        <div className="space-y-8 max-w-xl">
            {/* Profile Picture Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Profile picture</h3>
                <div className="h-20 w-20 rounded-full bg-[#4f8e36] flex items-center justify-center text-3xl font-medium text-white overflow-hidden">
                    {user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                        user.name.charAt(0).toUpperCase()
                    )}
                </div>
            </div>

            {/* Display Name Section */}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Display name</Label>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={user.name}
                        className="bg-[#1a1a1a] border-[#333333] text-white focus:ring-offset-0 focus:border-white"
                    />
                </div>
                <div className="pt-2">
                    <Button disabled={isPending} className="bg-white text-black hover:bg-gray-200">
                        Save Changes
                    </Button>
                </div>
            </form>

            <div className="h-px bg-[#333333]" />

            {/* Language Section */}
            <div className="space-y-4">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-white">Language</h3>
                    <p className="text-sm text-gray-500">Change your language preferences.</p>
                </div>

                {/* Mock Select for Language */}
                <div className="relative w-full max-w-xs">
                    <select
                        className="flex h-10 w-full items-center justify-between rounded-md border border-[#333333] bg-[#1a1a1a] px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                        defaultValue="en"
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                </div>
            </div>

            <div className="h-px bg-[#333333]" />

            {/* Delete Account Section */}
            <div className="space-y-4">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-white">Delete account</h3>
                    <p className="text-sm text-gray-500">Once you delete your account, there is no going back. This action cannot be undone.</p>
                </div>
                <Button variant="destructive" className="bg-[#2a2a2a] text-white border border-[#333333] hover:bg-red-900/50 hover:border-red-900 hover:text-red-500 transition-colors">
                    Delete account
                </Button>
            </div>

        </div>
    );
}
