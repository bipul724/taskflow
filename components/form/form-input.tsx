"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ id, label, type, placeholder, required, disabled, errors, className, defaultValue, onBlur }, ref) => {
        const { pending } = useFormStatus();

        return (
            <div className="space-y-2">
                <div className="space-y-1">
                    {label ? (
                        <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
                            {label}
                        </Label>
                    ) : null}
                    <Input
                        onBlur={onBlur}
                        defaultValue={defaultValue}
                        ref={ref}
                        required={required}
                        name={id}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        disabled={pending || disabled}
                        className={cn("text-sm px-2 py-1 h-7", className)}
                        aria-describedby={`${id}-error`}
                    />
                </div>
                {/* Simple error display */}
                {errors?.[id] ? (
                    <div id={`${id}-error`} aria-live="polite" className="mt-2 text-xs text-rose-500">
                        {errors[id].map((error: string) => (
                            <div key={error} className="flex items-center font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm">
                                {error}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        );
    }
);

FormInput.displayName = "FormInput";
