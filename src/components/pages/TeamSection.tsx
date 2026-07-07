import Image from "next/image";
import { HeartHandshake, Sparkles } from "lucide-react";

import { EditableItem, SiteContent } from "@/lib/cmsContent";

function getName(member: EditableItem) {
  return member.name || member.title || "Team Member";
}

function getBullets(member: EditableItem) {
  return (member.description || "")
    .split(/\n|\u2022/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function TeamSection({ content }: { content: SiteContent }) {
  const members = content.teamMembers.filter((member) => getName(member) || member.role || member.imageUrl);

  if (!members.length) {
    return null;
  }

  return (
    <section className="mt-4 rounded-[8px] border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600 sm:text-sm sm:tracking-[0.26em]">
          {content.teamEyebrow}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-[1.75rem] font-bold leading-tight text-teal-800 sm:mt-4 sm:text-5xl">
          {content.teamTitle}
        </h2>
        {content.teamDescription ? (
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-5 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            {content.teamDescription}
          </p>
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 lg:mt-8 lg:grid-cols-3">
        {members.map((member) => {
          const bullets = getBullets(member);

          return (
            <article key={member.id} className="group overflow-hidden rounded-[8px] border border-slate-200 bg-stone-50 transition duration-300 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-slate-900/8">
              <div className="relative aspect-[4/3] bg-[linear-gradient(135deg,#ecfeff,#fff7ed)]">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={getName(member)}
                    fill
                    unoptimized={member.imageUrl.startsWith("data:")}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-teal-700 shadow-sm sm:h-16 sm:w-16">
                      <HeartHandshake className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-5">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold leading-tight text-teal-800 sm:text-2xl">
                  {getName(member)}
                </h3>
                {member.role || member.value ? (
                  <p className="mt-0.5 text-base tracking-[0.06em] text-teal-700 sm:mt-1 sm:text-lg sm:tracking-[0.08em]">
                    {member.role || member.value}
                  </p>
                ) : null}
                {member.tag ? (
                  <p className="mt-2 flex gap-2 text-xs italic leading-5 text-slate-500 sm:mt-4 sm:text-sm sm:leading-6">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {member.tag}
                  </p>
                ) : null}
                {bullets.length ? (
                  <ul className="mt-3 grid gap-1.5 text-xs leading-5 text-slate-600 sm:mt-4 sm:gap-2 sm:text-sm sm:leading-6">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
