"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Compact auth controls for the marketing navbar.
 * Keep visual weight low — Apply / mailing-list CTA stays primary.
 *
 * Clerk Core 3: use `<Show when="signed-in|signed-out">` instead of
 * the removed `<SignedIn>` / `<SignedOut>` components.
 */
export function AuthControls({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div className={cn("flex items-center", className)}>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              onDark && "text-cream hover:bg-white/10 hover:text-white",
            )}
          >
            Sign in
          </Button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "size-8",
            },
          }}
        />
      </Show>
    </div>
  );
}
