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
    <section className="bg-white py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="grid gap-8 overflow-hidden rounded-[8px] border border-slate-200 bg-stone-50 p-5 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            <div className="relative min-h-[320px] overflow-hidden rounded-[8px] bg-teal-50">
              {story.imageUrl ? (
                <Image src={story.imageUrl} alt={story.title} fill unoptimized className="object-cover" />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center">
                  <Heart className="h-20 w-20 text-teal-700" />
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center p-2 lg:p-6">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-600">
                {story.name || content.storyEyebrow}
              </p>
              <h2 className="mt-5 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                {story.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">{story.description}</p>

              {story.linkLabel && story.linkHref ? (
                <Button asChild className="mt-8 h-12 w-fit rounded-full bg-teal-700 px-7 text-base hover:bg-teal-800">
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
