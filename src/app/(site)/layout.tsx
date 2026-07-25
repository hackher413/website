import * as React from "react";

/**
 * Layout for all public marketing routes. The sticky Navbar and Footer are
 * added in Step 4; for now this establishes the semantic `<main>` landmark that
 * the "Skip to content" link targets.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="main" className="flex-1">
      {children}
    </main>
  );
}
