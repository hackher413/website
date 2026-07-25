import * as React from "react";

import { Navbar, Footer } from "@/components/layout";

/**
 * Layout for all public marketing routes: sticky Navbar, the semantic `<main>`
 * landmark that the "Skip to content" link targets, and the Footer.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
