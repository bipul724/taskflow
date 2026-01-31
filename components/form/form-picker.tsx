"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom"; // Use status to disable interactions
import Image from "next/image";

import { cn } from "@/lib/utils";
import { fetchImages, UnsplashImage } from "@/actions/fetch-images";
import Link from "next/link";
// import { defaultImages } from "@/constants/images"; // Fallback if API fails?

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
    const { pending } = useFormStatus();

    const [images, setImages] = useState<UnsplashImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        const fetchNewImages = async () => {
            try {
                const res = await fetchImages();

                if (res.error) {
                    console.error(res.error);
                    // In a real app, maybe fallback to static gradients here
                } else if (res.images) {
                    setImages(res.images);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewImages();
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                            pending && "opacity-50 hover:opacity-50 cursor-auto"
                        )}
                        onClick={() => {
                            if (pending) return;
                            setSelectedImageId(image.id as any);
                        }}
                    >
                        <input
                            type="radio"
                            id={id}
                            name={id}
                            className="hidden"
                            checked={selectedImageId === image.id}
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                            readOnly
                        />
                        <Image
                            src={image.urls.thumb}
                            alt="Unsplash image"
                            className="object-cover rounded-sm"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {selectedImageId === image.id && (
                            <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target="_blank"
                            className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            {errors?.[id] ? (
                <div className="text-xs text-rose-500">
                    {errors[id].map((error) => (
                        <div key={error}>{error}</div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};
