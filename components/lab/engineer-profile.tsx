"use client";

import { LAB_ACHIEVEMENTS } from "@/content/lab/achievements";
import { buildEngineerProfile } from "@/lib/lab/profile";
import { useLabStore } from "@/lib/lab/use-lab-store";

export function EngineerProfileCard() {
  const store = useLabStore();
  const profile = buildEngineerProfile(store);
  const unlocked = store.achievements;

  return (
    <section className="border border-border p-5" aria-label="Engineer profile">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        Engineer profile
      </p>
      <dl className="mt-4 grid grid-cols-3 gap-3 font-mono text-[11px] uppercase tracking-[0.12em]">
        <div>
          <dt className="text-muted-dim">Completed</dt>
          <dd className="mt-1 text-lg text-foreground">{profile.completed}</dd>
        </div>
        <div>
          <dt className="text-muted-dim">Best</dt>
          <dd className="mt-1 text-lg text-foreground">{profile.bestScore}</dd>
        </div>
        <div>
          <dt className="text-muted-dim">Streak</dt>
          <dd className="mt-1 text-lg text-foreground">{profile.streak}</dd>
        </div>
      </dl>
      <ul className="mt-5 space-y-1 text-sm text-muted">
        {profile.byExperience.map((row) => (
          <li key={row.id} className="flex justify-between gap-3">
            <span>{row.title}</span>
            <span className="font-mono text-foreground">{row.score}</span>
          </li>
        ))}
      </ul>
      <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        Achievements
      </h3>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {LAB_ACHIEVEMENTS.map((item) => {
          const on = unlocked.includes(item.id);
          return (
            <li
              key={item.id}
              className={
                on
                  ? "border border-accent/40 bg-accent-soft px-3 py-2"
                  : "border border-border px-3 py-2 opacity-60"
              }
            >
              <p className="text-sm text-foreground">{item.title}</p>
              <p className="mt-1 text-xs text-muted">{item.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
