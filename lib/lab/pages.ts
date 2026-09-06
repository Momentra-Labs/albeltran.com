import { LAB_EXPERIENCES } from "@/content/lab/experiences";
import type { LabExperienceId } from "@/content/lab/types";

export function labRelated(id: LabExperienceId, count = 3) {
  return LAB_EXPERIENCES.filter((item) => item.id !== id)
    .slice(0, count)
    .map((item) => ({ href: item.href, title: item.title }));
}
