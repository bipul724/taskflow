"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

interface GetStartedButtonProps {
  text?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showWelcomeMessage?: boolean;
  unauthenticatedHref?: string;
}

export const GetStartedButton = ({
  text = "Get Started",
  variant = "default",
  size = "lg",
  showWelcomeMessage = true,
  className,
  unauthenticatedHref = "/auth/register",
}: GetStartedButtonProps = {}) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button
        size={size}
        variant={variant}
        className={`opacity-50 ${className || ""}`}
        asChild
      >
        <span>{text}</span>
      </Button>
    );
  }

  const href = session ? "/dashboard" : unauthenticatedHref;

  return (
    // 1. Remove className from the outer div
    <div className="flex flex-col items-center gap-4">
      <Button
        size={size}
        variant={variant}
        asChild
        // 2. Apply className here so border-radius affects the button
        className={className}
      >
        <Link href={href}>{text}</Link>
      </Button>

      {session && showWelcomeMessage && (
        <p className="flex items-center gap-2">
          <span
            data-role={session.user.role}
            className="size-4 rounded-full animate-pulse data-[role=USER]:bg-blue-600 data-[role=ADMIN]:bg-red-600"
          />
          Welcome back, {session.user.name}! 👋
        </p>
      )}
    </div>
  );
};