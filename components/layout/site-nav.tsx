"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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

function folioIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("work");
  const [scrolled, setScrolled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const isHome = pathname === "/";

  const openPalette = useCallback(() => setOpen(true), []);
  usePaletteHotkey(openPalette);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduce = () => setReduceMotion(media.matches);
    syncReduce();
    media.addEventListener("change", syncReduce);

    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      media.removeEventListener("change", syncReduce);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
        <div
          className={cn(
            "grid h-10 grid-cols-[auto_1fr_auto] items-center gap-3 border-b px-2 sm:px-5 md:grid-cols-[1fr_auto_1fr] lg:px-7",
            scrolled
              ? reduceMotion
                ? "border-border bg-background"
                : "border-border bg-background/90 backdrop-blur-md"
              : "border-border bg-transparent",
          )}
        >
          <Link
            href="/"
            className="py-2 font-mono text-[10px] tracking-[0.22em] text-muted hover:text-foreground"
            data-cursor="→"
            aria-label={`${person.brand} home`}
          >
            {person.brand}
          </Link>

          <nav
            className="hidden items-center justify-center gap-x-3 md:flex lg:gap-x-5"
            aria-label="Primary"
          >
            {SECTION_NAV.map((link, index) => (
              <Link
                key={link.hash}
                href={link.href}
                data-cursor="→"
                className={cn(
                  "whitespace-nowrap py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
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
              className="hidden py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted hover:text-foreground lg:inline"
              onClick={openPalette}
              aria-label="Open command palette"
            >
              Ctrl K
            </button>
            <Link
              href="/#contact"
              data-cursor="→"
              className="hidden py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground hover:text-accent md:inline"
            >
              Let&apos;s talk
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center text-muted hover:text-foreground md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-4 w-4" strokeWidth={1.5} />
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
