import Link from "next/link";
import { Mail } from "lucide-react";

import { footerNav, siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import {
  InstagramIcon,
  LinkedInIcon,
  DiscordIcon,
} from "@/components/icons/brand-icons";

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    Icon: InstagramIcon,
  },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: "Discord", href: siteConfig.social.discord, Icon: DiscordIcon },
  { label: "Email", href: siteConfig.social.email, Icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-espresso text-cream">
      <Container className="py-14">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo tone="onDark" />
            <p className="mt-4 text-sm text-cream/65 text-pretty">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="inline-flex size-9 items-center justify-center rounded-md text-cream/65 transition-colors hover:bg-white/10 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold text-cream">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-cream/65 transition-colors hover:text-cream"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-8 text-sm text-cream/50 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.name}
          </p>
          <p>College of Information &amp; Computer Sciences, UMass Amherst</p>
        </div>
      </Container>
    </footer>
  );
}
