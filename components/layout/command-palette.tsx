"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { projects } from "@/content/projects";
import { libraries } from "@/content/libraries";
import { useRecruiter } from "@/components/layout/recruiter-provider";
import { cn } from "@/lib/utils";

type PaletteItem = {
  id: string;
  label: string;
  hint?: string;
  href?: string;
  action?: () => void;
};

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { toggleRecruiter } = useRecruiter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items = useMemo<PaletteItem[]>(() => {
    const nav: PaletteItem[] = [
      { id: "record", label: "Go to The record", href: "/#record" },
      { id: "stack", label: "Skills & certifications", href: "/#stack" },
      { id: "work", label: "Go to Work", href: "/#work" },
      { id: "lab", label: "Engineering Lab", href: "/lab/" },
      { id: "incident", label: "Incident Desk #4821", href: "/lab/incident/?c=4821" },
      { id: "build", label: "How I'd Build This", href: "/lab/how-id-build/" },
      { id: "failures", label: "Things that didn't work", href: "/failures/" },
      { id: "think", label: "How I think", href: "/#think" },
      { id: "building", label: "Currently building", href: "/#building" },
      { id: "momentra", label: "Momentra Labs", href: "/#lab" },
      { id: "experience", label: "Go to Experience", href: "/experience/" },
      {
        id: "certifications",
        label: "Licenses & certifications",
        href: "/experience/#certifications",
      },
      { id: "writing", label: "Go to Writing", href: "/blog/" },
      { id: "about", label: "Go to About", href: "/about/" },
      { id: "now", label: "Go to Now", href: "/#now" },
      { id: "notes", label: "Go to Notes", href: "/#notes" },
      { id: "contact", label: "Contact", href: "/#contact" },
      { id: "blog", label: "Engineering Journal", href: "/blog/" },
      { id: "topics", label: "Topics", href: "/topics/" },
      { id: "interviews", label: "Interview notes", href: "/interviews/" },
      { id: "author", label: "Author: Al Beltran", href: "/author/al-beltran/" },
      { id: "projects", label: "All projects", href: "/projects/" },
      { id: "libraries", label: "Open-source libraries", href: "/libraries/" },
      { id: "resume", label: "Download Resume", href: "/resume.pdf" },
      {
        id: "recruiter",
        label: "Toggle Recruiter View",
        action: () => toggleRecruiter(),
      },
    ];
    const libraryItems = libraries.map((library) => ({
      id: `lib-${library.slug}`,
      label: library.packageName,
      hint: "Library",
      href: `/libraries/${library.slug}/`,
    }));
    const projectItems = projects.map((project) => ({
      id: `p-${project.slug}`,
      label: project.name,
      hint: project.kind === "lab" ? "Lab" : "Project",
      href: `/projects/${project.slug}/`,
    }));
    return [...nav, ...libraryItems, ...projectItems];
  }, [toggleRecruiter]);

  const filtered = items.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return `${item.label} ${item.hint ?? ""}`.toLowerCase().includes(q);
  });

  function handleOpenChange(next: boolean) {
    if (!next) {
      setQuery("");
      setActive(0);
    }
    onOpenChange(next);
  }

  function run(item: PaletteItem) {
    handleOpenChange(false);
    if (item.action) item.action();
    if (item.href) {
      if (item.href.endsWith(".pdf")) {
        window.open(item.href, "_blank");
        return;
      }
      router.push(item.href);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 sm:p-0">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search projects and jump to sections
        </DialogDescription>
        <div className="border-b border-border px-4 py-3">
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((index) =>
                  Math.min(index + 1, Math.max(filtered.length - 1, 0)),
                );
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((index) => Math.max(index - 1, 0));
              }
              if (event.key === "Enter" && filtered[active]) {
                event.preventDefault();
                run(filtered[active]);
              }
            }}
            placeholder="Search projects, sections, contact…"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-dim"
            aria-label="Command search"
          />
        </div>
        <ul className="max-h-80 overflow-auto py-2" role="listbox">
          {filtered.map((item, index) => (
            <li key={item.id} role="option" aria-selected={index === active}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-muted hover:bg-surface-2 hover:text-foreground",
                  index === active && "bg-surface-2 text-foreground",
                )}
                onClick={() => run(item)}
                onMouseEnter={() => setActive(index)}
              >
                <span>{item.label}</span>
                {item.hint ? (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-dim">
                    {item.hint}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-sm text-muted">No matches.</li>
          ) : null}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export function usePaletteHotkey(onOpen: () => void) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen]);
}
