import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";

import SmartNavLink from "@/components/layout/SmartNavLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function FeaturedStory({ content }: { content: SiteContent }) {
  const story = content.featuredStory;

  return (
    <section className="bg-white py-6 md:py-12">
      <Container>
        <Reveal>
          <div className="grid gap-4 overflow-hidden rounded-[8px] border border-slate-200 bg-stone-50 p-3 shadow-sm sm:p-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:p-8">
            <div className="relative min-h-[170px] overflow-hidden rounded-[8px] bg-teal-50 sm:min-h-[320px]">
              {story.imageUrl ? (
                <Image src={story.imageUrl} alt={story.title} fill unoptimized={story.imageUrl.startsWith("data:")} className="object-cover" />
              ) : (
                <div className="flex h-full min-h-[170px] items-center justify-center sm:min-h-[320px]">
                  <Heart className="h-16 w-16 text-teal-700 sm:h-20 sm:w-20" />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center px-1 pb-1 lg:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 sm:text-sm sm:tracking-[0.24em]">
                {story.name || content.storyEyebrow}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.75rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
                {story.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">{story.description}</p>

              {story.linkLabel && story.linkHref ? (
                <Button asChild className="mt-4 h-10 w-full rounded-full bg-teal-700 px-5 text-sm hover:bg-teal-800 sm:mt-8 sm:h-12 sm:w-fit sm:px-7 sm:text-base">
                  <SmartNavLink href={story.linkHref}>
                    {story.linkLabel}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </SmartNavLink>
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

