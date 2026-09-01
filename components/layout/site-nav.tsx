"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { SECTION_NAV } from "@/lib/constants";
import { person } from "@/content/person";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
      <header className="fixed inset-x-0 top-3 z-40 flex justify-center px-4">
        <div className="flex h-10 w-full max-w-6xl items-center justify-between gap-3 border border-border/60 bg-background/70 px-3 backdrop-blur-md sm:px-4">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.22em] text-muted hover:text-foreground"
            data-cursor="→"
            aria-label={`${person.brand} home`}
          >
            {person.brand}
          </Link>

          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Primary"
          >
            {SECTION_NAV.map((link) => (
              <Link
                key={link.hash}
                href={link.href}
                data-cursor="→"
                className={cn(
                  "px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors",
                  isHome && active === link.hash
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hidden h-7 font-mono text-[10px] tracking-[0.16em] text-muted lg:inline-flex"
              onClick={openPalette}
              aria-label="Open command palette"
            >
              Ctrl K
            </Button>
            <RecruiterToggle className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted xl:inline" />
            <Button asChild size="sm" className="h-7 rounded-sm px-3 text-[11px]">
              <Link href="/#contact" data-cursor="→">
                Contact
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
              className="h-7 w-7 md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{person.brand}</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1" aria-label="Mobile">
                  {SECTION_NAV.map((link) => (
                    <SheetClose asChild key={link.hash}>
                      <Link
                        href={link.href}
                        className="px-3 py-3 font-mono text-sm uppercase tracking-wider text-muted hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="/#contact"
                      className="px-3 py-3 font-mono text-sm uppercase tracking-wider text-muted hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </SheetClose>
                  <button
                    type="button"
                    className="px-3 py-3 text-left font-mono text-sm uppercase tracking-wider text-muted hover:text-foreground"
                    onClick={() => {
                      toggleRecruiter();
                    }}
                  >
                    {recruiter ? "Default view" : "Recruiter view"}
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
