import Link from "next/link";
import type { LabEducationBlock } from "@/content/lab/types";

export function LabEducation({
  education,
  related,
}: {
  education: LabEducationBlock;
  related?: { href: string; title: string }[];
}) {
  return (
    <div className="mt-16 space-y-10 border-t border-border pt-12">
      <section>
        <h2 className="font-display text-2xl tracking-tight text-foreground">
          How the challenge works
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          {education.howItWorks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-display text-2xl tracking-tight text-foreground">Key concepts</h2>
        <div className="mt-4 space-y-4">
          {education.keyConcepts.map((item) => (
            <div key={item.title}>
              <h3 className="font-medium text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-display text-2xl tracking-tight text-foreground">
          Common mistakes
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          {education.commonMistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      {education.recommended?.length ? (
        <section>
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            Recommended architecture
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
            {education.recommended.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}
      <section>
        <h2 className="font-display text-2xl tracking-tight text-foreground">Interview tips</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          {education.interviewTips.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      {related?.length ? (
        <section>
          <h2 className="font-display text-2xl tracking-tight text-foreground">
            Related challenges
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {related.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-accent hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
