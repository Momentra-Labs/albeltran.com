"use client";

import { createContext, useContext, useState } from "react";
import { ProjectDrawer } from "@/components/projects/project-drawer";
import type { Project } from "@/content/projects";

const OpenProject = createContext<(project: Project) => void>(() => {});

export function SelectedWorkDrawer({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <OpenProject.Provider value={setActive}>
      {children}
      <ProjectDrawer
        project={active}
        open={Boolean(active)}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      />
    </OpenProject.Provider>
  );
}

export function SelectedWorkOpen({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  const open = useContext(OpenProject);

  return (
    <button
      type="button"
      data-cursor="VIEW"
      className="showcase-card-copy w-full text-left"
      onClick={() => open(project)}
    >
      {children}
    </button>
  );
}
