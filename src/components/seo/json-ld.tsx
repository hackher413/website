import { siteConfig } from "@/lib/site";
import { event } from "@/content/event";

/**
 * Structured data (schema.org JSON-LD). Rendered as a script tag so search
 * engines can surface rich results. We emit two graphs: the Organization (who
 * we are, sitewide) and the Event (the hackathon, its dates and venue).
 *
 * Server-rendered inline; `dangerouslySetInnerHTML` is the standard, safe way
 * to embed JSON-LD (the payload is our own static, non-user data).
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
    ],
  };

  const eventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${siteConfig.name} ${event.year}`,
    description: siteConfig.description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: event.isConcluded
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventScheduled",
    startDate: "2026-02-21",
    endDate: "2026-02-22",
    location: {
      "@type": "Place",
      name: `${event.venue.name}, ${event.venue.org}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Amherst",
        addressRegion: "MA",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    isAccessibleForFree: true,
    url: siteConfig.url,
  };

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={eventData} />
    </>
  );
}
