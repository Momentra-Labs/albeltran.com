import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQItem } from "@/content/faqs";

export function FAQ({
  items,
  title = "Common questions",
}: {
  items: FAQItem[];
  title?: string;
}) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
