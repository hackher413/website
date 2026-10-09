"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { applyStatus } from "@/content/apply";

/**
 * Application page - redirects to /apply when open, or shows closed message when closed.
 */
export default function ApplicationPage() {
  const router = useRouter();

  useEffect(() => {
    if (applyStatus.isOpen) {
      window.scrollTo(0, 0);
      router.push("/apply");
    }
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Applications coming soon</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We're not accepting applications yet, but we'd love to have you in our community. Join the mailing list and we'll email you the moment applications open.
        </p>
        <a
          href="https://forms.gle/YmY38wRxLSWWFQkKA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-honey text-honey-foreground px-6 py-3 rounded-md font-medium hover:bg-honey/90"
        >
          Join the mailing list
        </a>
      </div>
    </div>
  );
}
