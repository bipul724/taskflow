"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming we have or can use standard textarea styling
import { toast } from "sonner";
import { Zap } from "lucide-react";

export function WorkspaceSettingsForm() {
    const [isPending, setIsPending] = useState(false);

    // Mock data
    const defaultValues = {
        name: "Ayanokoji",
        urlSlug: "r6h8qawy6c1e",
        description: "",
    };

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setIsPending(true);

        // Simulate API call
        setTimeout(() => {
            setIsPending(false);
            toast.success("Workspace settings updated");
        }, 1000);
    }

    return (
        <div className="space-y-8 max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Workspace Name */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Workspace name</Label>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={defaultValues.name}
                        className="bg-[#1a1a1a] border-[#333333] text-white focus:ring-offset-0 focus:border-white"
                    />
                </div>

                {/* Workspace URL */}
                <div className="space-y-2">
                    <Label htmlFor="url" className="text-white">Workspace URL</Label>
                    <div className="flex rounded-md border border-[#333333] bg-[#1a1a1a] focus-within:ring-1 focus-within:ring-white focus-within:border-white overflow-hidden">
                        <span className="flex items-center px-3 text-gray-500 text-sm border-r border-[#333333] select-none">
                            kan.bn/
                        </span>
                        <input
                            id="url"
                            name="url"
                            defaultValue={defaultValues.urlSlug}
                            className="flex-1 bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {/* Workspace Description */}
                <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">Workspace description</Label>
                    {/* Custom styled textarea since we might not have a Textarea component or it might need specific styling */}
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        defaultValue={defaultValues.description}
                        className="flex w-full rounded-md border border-[#333333] bg-[#1a1a1a] px-3 py-2 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                {/* Upgrade Button */}
                <div>
                    <Button
                        type="button" // Prevent form submit
                        className="bg-white text-black hover:bg-gray-200 gap-2 font-medium"
                    >
                        Upgrade to Pro
                        <Zap size={16} className="fill-black" />
                    </Button>
                </div>

                {/* Save Changes Button (Hidden in screenshot but typically needed, sticking to screenshot which only implies updates or maybe 'Upgrade' is the only action? 
           Actually the screenshot shows inputs which implies they are editable. 
           Usually there is a Save button. 
           However, sticking STRICTLY to the screenshot, there is NO Save button visible for the form fields, only "Upgrade to Pro" 
           and then "Delete workspace".
           Maybe it auto-saves? Or the screenshot is cut off?
           I will add a Save button typically, or maybe the inputs blur-save?
           Wait, looking at the previous settings page screenshot, there WAS a "Save Changes" button. 
           This screenshot does NOT show one. 
           It might be below the fold or implied. 
           I'll add a "Update Workspace" button for usability, or just let the "Upgrade" button be the prominent one
           and rely on 'Enter' to submit since I wrapped it in a <form>.
           Actually, I'll add a 'Save Changes' button because it's standard UX, even if not explicitly in the partial screenshot.
           BUT, looking closely, the "Upgrade to Pro" is in the flow.
           I'll add a generic 'Save' button.
        */}
                <div className="pt-2">
                    <Button disabled={isPending} className="bg-white text-black hover:bg-gray-200">
                        Update Workspace
                    </Button>
                </div>

            </form>

            <div className="h-px bg-[#333333]" />

            {/* Delete Workspace Section */}
            <div className="space-y-4">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-white">Delete workspace</h3>
                    <p className="text-sm text-gray-500">Once you delete your workspace, there is no going back. This action cannot be undone.</p>
                </div>
                <Button variant="destructive" className="bg-[#2a2a2a] text-white border border-[#333333] hover:bg-red-900/50 hover:border-red-900 hover:text-red-500 transition-colors">
                    Delete workspace
                </Button>
            </div>

        </div>
    );
}
