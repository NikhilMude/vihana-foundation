import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function Faq({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white py-6 md:py-12">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
              {content.faqEyebrow}
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
              {content.faqTitle}
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-7 grid max-w-4xl gap-3">
          {content.faqs.map((item) => (
            <details key={item.id} className="group rounded-[8px] border border-slate-200 bg-slate-50 p-4 open:bg-white open:shadow-sm sm:p-5">
              <summary className="cursor-pointer text-base font-bold leading-7 text-slate-950 sm:text-lg">
                {item.question || item.title}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">{item.answer || item.description}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

