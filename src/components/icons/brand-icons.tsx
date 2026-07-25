import * as React from "react";

/**
 * Inline brand glyphs. lucide-react dropped third-party brand icons (Instagram,
 * LinkedIn, …) for trademark reasons, so we ship minimal SVGs that match
 * lucide's sizing/stroke conventions. `currentColor` lets them inherit text
 * color like any lucide icon.
 */
type IconProps = React.SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function DiscordIcon(props: IconProps) {
  // Filled glyph (Discord's mark doesn't read well as a stroke outline).
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3c-.213.383-.46.9-.63 1.31a18.27 18.27 0 0 0-5.51 0A12.6 12.6 0 0 0 9.11 3a19.74 19.74 0 0 0-4.435 1.37C1.87 8.59 1.108 12.7 1.49 16.75a19.9 19.9 0 0 0 6.073 3.078c.49-.667.927-1.376 1.302-2.12-.714-.27-1.398-.603-2.044-.997.171-.126.339-.257.5-.392a14.2 14.2 0 0 0 12.16 0c.163.14.33.27.5.392-.647.395-1.332.728-2.047.998.375.743.81 1.452 1.3 2.12a19.86 19.86 0 0 0 6.076-3.079c.448-4.694-.766-8.767-3.207-12.38ZM8.02 14.33c-1.183 0-2.157-1.085-2.157-2.42 0-1.334.955-2.42 2.157-2.42 1.21 0 2.176 1.096 2.157 2.42 0 1.335-.955 2.42-2.157 2.42Zm7.96 0c-1.183 0-2.157-1.085-2.157-2.42 0-1.334.955-2.42 2.157-2.42 1.21 0 2.176 1.096 2.157 2.42 0 1.335-.946 2.42-2.157 2.42Z" />
    </svg>
  );
}
