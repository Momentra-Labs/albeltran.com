import type { LabExperienceId } from "@/content/lab/types";
import { LAB_EXPERIENCES } from "@/content/lab/experiences";
import { readLabStore, type LabStore } from "./storage";

export type EngineerProfile = {
  completed: number;
  bestScore: number;
  streak: number;
  byExperience: { id: LabExperienceId; title: string; score: number }[];
};

export function buildEngineerProfile(store: LabStore = readLabStore()): EngineerProfile {
  const scores = Object.values(store.bestByExperience);
  return {
    completed: Object.keys(store.completed).length,
    bestScore: scores.length ? Math.max(...scores) : 0,
    streak: store.streak.count,
    byExperience: LAB_EXPERIENCES.map((item) => ({
      id: item.id,
      title: item.title,
      score: store.bestByExperience[item.id] ?? 0,
    })),
  };
}
