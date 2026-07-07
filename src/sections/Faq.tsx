import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function Faq({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.26em] text-amber-600">
              {content.faqEyebrow}
            </span>
            <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              {content.faqTitle}
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-4xl gap-3">
          {content.faqs.map((item) => (
            <details key={item.id} className="group rounded-[8px] border border-slate-200 bg-slate-50 p-5 open:bg-white open:shadow-sm">
              <summary className="cursor-pointer text-lg font-bold text-slate-950">
                {item.question || item.title}
              </summary>
              <p className="mt-4 leading-7 text-slate-600">{item.description || item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

