import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is RetailOS AI ready for production use?",
    a: "We're actively onboarding our founding customers. If you'd like early access, create an account and we'll be in touch.",
  },
  {
    q: "Do you support multiple branches?",
    a: "Yes. The platform is multi-tenant and multi-branch by design, with roles and permissions built in.",
  },
  {
    q: "What about my existing data?",
    a: "Our team will help you import products, customers and historical sales from your current system during onboarding.",
  },
  {
    q: "How does the AI copilot work?",
    a: "The copilot understands your live catalog, sales and stock. You ask questions in plain English and get answers, suggestions and actions.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="container-page py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-brand">FAQ</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Questions, answered
        </h2>
      </div>
      <div className="mx-auto mt-10 max-w-2xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-[15px]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}