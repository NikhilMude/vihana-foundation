import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SiteContent } from "@/lib/cmsContent";

export default function FeaturedStory({ content }: { content: SiteContent }) {
  const story = content.featuredStory;

  return (
    <section className="bg-white py-10 md:py-16">
      <Container>
        <Reveal>
          <div className="grid gap-5 overflow-hidden rounded-[8px] border border-slate-200 bg-stone-50 p-4 shadow-sm sm:p-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:p-8">
            <div className="relative min-h-[240px] overflow-hidden rounded-[8px] bg-teal-50 sm:min-h-[320px]">
              {story.imageUrl ? (
                <Image src={story.imageUrl} alt={story.title} fill unoptimized className="object-cover" />
              ) : (
                <div className="flex h-full min-h-[240px] items-center justify-center sm:min-h-[320px]">
                  <Heart className="h-16 w-16 text-teal-700 sm:h-20 sm:w-20" />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center p-2 lg:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 sm:text-sm sm:tracking-[0.24em]">
                {story.name || content.storyEyebrow}
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-[2rem] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-5xl">
                {story.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">{story.description}</p>

              {story.linkLabel && story.linkHref ? (
                <Button asChild className="mt-6 h-12 w-full rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800 sm:mt-8 sm:w-fit">
                  <Link href={story.linkHref}>
                    {story.linkLabel}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

