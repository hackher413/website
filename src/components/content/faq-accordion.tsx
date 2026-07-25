"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/content/faq";

/**
 * Accessible accordion for a list of FAQ items. Wraps the shadcn Accordion with
 * FAQ-appropriate typography. `type="single" collapsible` so only one answer is
 * open at a time and any item can be closed. Ids are namespaced by `idPrefix`
 * so multiple accordions (one per category) don't collide.
 */
export function FaqAccordion({
  items,
  idPrefix = "faq",
}: {
  items: FaqItem[];
  idPrefix?: string;
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={`${idPrefix}-${i}`} value={`${idPrefix}-${i}`}>
          <AccordionTrigger className="py-4 text-base">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
