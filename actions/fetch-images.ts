"use server";

import { auth } from "@/lib/auth";
import { unsplash } from "@/lib/unsplash";
import { headers } from "next/headers";
import { ratelimit } from "@/lib/rate-limit";

// Define the Unsplash Image type we expect
// (Simplified from Unsplash response)
export type UnsplashImage = {
    id: string;
    urls: {
        thumb: string;
        full: string;
        regular: string;
        small: string;
    };
    links: {
        html: string;
    };
    user: {
        name: string;
        links: {
            html: string;
        };
    };
};

export const fetchImages = async (): Promise<{
    images?: UnsplashImage[];
    error?: string;
}> => {
    try {
        const headersList = await headers();
        const session = await auth.api.getSession({
            headers: headersList,
        });

        if (!session || !session.user) {
            return { error: "Unauthorized" };
        }

        // Rate Limiting
        const { success } = await ratelimit.limit(session.user.id);
        if (!success) {
            return { error: "Rate limit exceeded. Please try again later." };
        }

        const result = await unsplash.photos.getRandom({
            collectionIds: ["317099"], // Default Unsplash collection
            count: 9,
        });

        if (result.errors) {
            console.error("Unsplash API Error:", result.errors);
            return { error: "Failed to fetch images from Unsplash" };
        }

        if (result.response) {
            const images = (Array.isArray(result.response) ? result.response : [result.response]) as unknown as UnsplashImage[];
            return { images };
        }

        return { error: "No images found" };

    } catch (error) {
        console.error("Internal Error fetching images:", error);
        return { error: "Internal Server Error" };
    }
};
