"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/lib/auth-client";
import { changePasswordAction } from "@/actions/change-password.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { deleteAccountAction } from "@/actions/delete-account.action";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SettingsFormProps {
    user: {
        name: string;
        image?: string | null;
    };
}

export function SettingsForm({ user }: SettingsFormProps) {
    const [isPending, setIsPending] = useState(false);
    const [isPasswordPending, setIsPasswordPending] = useState(false);
    const [isDeletePending, setIsDeletePending] = useState(false);
    const router = useRouter();

    async function handleUpdateProfile(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget);
        const name = String(formData.get("name"));
        const image = String(formData.get("image"));

        if (!name) return;

        await updateUser({
            name,
            image,
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

    async function handleChangePassword(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget);

        setIsPasswordPending(true);
        const { error } = await changePasswordAction(formData);

        if (error) {
            toast.error(error);
        } else {
            toast.success("Password changed successfully");
            (evt.target as HTMLFormElement).reset();
        }
        setIsPasswordPending(false);
    }

    async function handleDeleteAccount() {
        setIsDeletePending(true);
        const res = await deleteAccountAction();
        if (res?.error) {
            toast.error(res.error);
            setIsDeletePending(false);
        }
        // Redirect handled by server action
    }

    return (
        <div className="space-y-8 max-w-xl">
            {/* Display Name & Image Section */}
            <form onSubmit={handleUpdateProfile} className="space-y-8">
                {/* Profile Picture Display */}
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

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Display name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={user.name}
                            className="bg-[#1a1a1a] border-[#333333] text-white focus:ring-offset-0 focus:border-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image" className="text-white">Profile Image URL</Label>
                        <Input
                            id="image"
                            name="image"
                            defaultValue={user.image || ""}
                            className="bg-[#1a1a1a] border-[#333333] text-white focus:ring-offset-0 focus:border-white"
                            placeholder="https://example.com/image.png"
                        />
                    </div>

                    <div className="pt-2">
                        <Button disabled={isPending} className="bg-white text-black hover:bg-gray-200">
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>

            <div className="h-px bg-[#333333]" />

            {/* Change Password Section */}
            <div className="space-y-4">
                <div className="space-y-1">
                    <h3 className="text-lg font-medium text-white">Change Password</h3>
                    <p className="text-sm text-gray-500">Update your password associated with this account.</p>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                        <Input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            className="bg-[#1a1a1a] border-[#333333] text-white focus:ring-offset-0 focus:border-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-white">New Password</Label>
                        <Input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            className="bg-[#1a1a1a] border-[#333333] text-white focus:ring-offset-0 focus:border-white"
                        />
                    </div>
                    <div className="pt-2">
                        <Button disabled={isPasswordPending} className="bg-white text-black hover:bg-gray-200">
                            Update Password
                        </Button>
                    </div>
                </form>
            </div>

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
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="bg-[#2a2a2a] text-white border border-[#333333] hover:bg-red-900/50 hover:border-red-900 hover:text-red-500 transition-colors">
                            Delete account
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#1a1a1a] border-[#333333] text-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-transparent border-gray-600 text-white hover:bg-[#2a2a2a] hover:text-white">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} disabled={isDeletePending} className="bg-red-600 hover:bg-red-700 text-white border-0">
                                {isDeletePending ? "Deleting..." : "Delete Account"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </div>
    );
}
