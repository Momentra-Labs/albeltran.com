"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTION_NAV } from "@/lib/constants";
import { person } from "@/content/person";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CommandPalette,
  usePaletteHotkey,
} from "@/components/layout/command-palette";
import { RecruiterToggle } from "@/components/layout/recruiter-toggle";
import { useRecruiter } from "@/components/layout/recruiter-provider";

function folioIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("work");
  const { recruiter, toggleRecruiter } = useRecruiter();
  const isHome = pathname === "/";

  const openPalette = useCallback(() => setOpen(true), []);
  usePaletteHotkey(openPalette);

  useEffect(() => {
    if (!isHome) return;
    const ids = SECTION_NAV.map((item) => item.hash);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <>
      <header className="fixed left-3 right-3 top-3 z-40">
        <div className="grid h-10 grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border md:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.22em] text-muted hover:text-foreground"
            data-cursor="→"
            aria-label={`${person.brand} home`}
          >
            {person.brand}
          </Link>

          <nav
            className="hidden items-center justify-center gap-x-3 lg:gap-x-5 md:flex"
            aria-label="Primary"
          >
            {SECTION_NAV.map((link, index) => (
              <Link
                key={link.hash}
                href={link.href}
                data-cursor="→"
                className={cn(
                  "whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  isHome && active === link.hash
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                <span className="text-accent">{folioIndex(index)}</span>
                <span className="ml-1.5">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted hover:text-foreground lg:inline"
              onClick={openPalette}
              aria-label="Open command palette"
            >
              Ctrl K
            </button>
            <RecruiterToggle className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted lg:inline" />
            <Link
              href="/#contact"
              data-cursor="→"
              className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-foreground hover:text-accent md:inline"
            >
              Let&apos;s talk
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted hover:text-foreground md:hidden"
                  aria-label="Open contents"
                >
                  Index
                </button>
              </SheetTrigger>
              <SheetContent className="shadow-none">
                <SheetHeader>
                  <SheetTitle className="font-display text-3xl font-normal tracking-tight">
                    Contents
                  </SheetTitle>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {person.brand}
                  </p>
                </SheetHeader>
                <nav className="flex flex-col" aria-label="Mobile">
                  {SECTION_NAV.map((link, index) => (
                    <SheetClose asChild key={link.hash}>
                      <Link
                        href={link.href}
                        className="flex items-baseline gap-4 border-b border-border py-4 font-mono text-sm uppercase tracking-[0.16em] text-muted hover:text-foreground"
                      >
                        <span className="text-accent">{folioIndex(index)}</span>
                        <span>{link.label}</span>
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className="flex items-baseline gap-4 border-b border-border py-4 font-mono text-sm uppercase tracking-[0.16em] text-muted hover:text-foreground"
                    >
                      <span className="text-accent">06</span>
                      <span>Let&apos;s talk</span>
                    </Link>
                  </SheetClose>
                  <button
                    type="button"
                    className="flex items-baseline gap-4 py-4 text-left font-mono text-sm uppercase tracking-[0.16em] text-muted hover:text-foreground"
                    onClick={() => {
                      toggleRecruiter();
                    }}
                  >
                    <span className="text-accent">07</span>
                    <span>
                      {recruiter ? "Default view" : "Recruiter view"}
                    </span>
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
}
