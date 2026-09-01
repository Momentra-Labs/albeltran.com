"use client";

import { useRecruiter } from "@/components/layout/recruiter-provider";
import { cn } from "@/lib/utils";

export function RecruiterToggle({ className }: { className?: string }) {
  const { recruiter, toggleRecruiter } = useRecruiter();

  return (
    <button
      type="button"
      onClick={toggleRecruiter}
      aria-pressed={recruiter}
      className={cn(
        "cursor-pointer bg-transparent p-0 font-inherit text-inherit hover:text-foreground",
        className,
      )}
    >
      {recruiter ? "Default view" : "Recruiter view"}
    </button>
  );
}
