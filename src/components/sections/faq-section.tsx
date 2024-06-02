import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/constant";

export function FAQSection() {
    return (
        <section className="container max-w-7xl py-16 mx-auto" id="faq">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                    <p className="bg-gradient-to-br from-neutral-700 to-black py-4 bg-clip-text text-left text-4xl md:text-7xl font-medium tracking-tight text-transparent">
                        Frequently Asked Questions
                    </p>
                    <p className="text-xl font-normal mt-4 text-left">
                        Get answers to common questions about Cancelflow.
                    </p>
                </div>

                <div className="md:col-span-2">
                    <Accordion type="single" collapsible className="w-full">
                        {faqData.map((faqItem) => (
                            <AccordionItem key={faqItem.id} value={faqItem.id}>
                                <AccordionTrigger>{faqItem.question}</AccordionTrigger>
                                <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
                                    {faqItem.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
