import { SignUp } from "@clerk/nextjs";
import { notFound } from "next/navigation";

import { authUiEnabled } from "@/lib/features";

export default function SignUpPage() {
  if (!authUiEnabled) notFound();

  return (
    <main className="flex min-h-full flex-1 items-center justify-center px-4 py-16">
      <SignUp />
    </main>
  );
}
