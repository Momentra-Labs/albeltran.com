"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
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

const focusRing =
  "rounded-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent";

const SECTION_PAGES: Record<string, string> = {
  work: "/projects/",
  about: "/about/",
  experience: "/experience/",
  now: "/now/",
};

function folioIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function sectionFromPath(pathname: string) {
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/experience")) return "experience";
  if (pathname.startsWith("/now")) return "now";
  if (pathname.startsWith("/projects") || pathname.startsWith("/blog")) {
    return "work";
  }
  if (pathname.startsWith("/contact")) return "contact";
  return null;
}

function sectionHref(hash: string, isHome: boolean) {
  if (isHome) return `/#${hash}`;
  return SECTION_PAGES[hash] ?? `/#${hash}`;
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("work");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [modKey, setModKey] = useState("Ctrl");
  const isHome = pathname === "/";
  const routeSection = sectionFromPath(pathname);
  const current = isHome ? active : routeSection;
  const raised = scrolled || !isHome;
  const contactHref = isHome ? "/#contact" : "/contact/";
  const shortcut = modKey === "⌘" ? "⌘K" : "Ctrl+K";

  const openPalette = useCallback(() => setOpen(true), []);
  usePaletteHotkey(openPalette);

  const openPaletteFromMenu = useCallback(() => {
    setMenuOpen(false);
    window.setTimeout(() => setOpen(true), 160);
  }, []);

  useEffect(() => {
    setModKey(
      /Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl",
    );
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduce = () => setReduceMotion(media.matches);
    syncReduce();
    media.addEventListener("change", syncReduce);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 16);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      media.removeEventListener("change", syncReduce);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = [...SECTION_NAV.map((item) => item.hash), "contact"];
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
      <header className="fixed left-3 right-3 top-3 z-[60]">
        <div
          className={cn(
            "relative grid h-12 grid-cols-[auto_1fr_auto] items-center gap-3 border px-3 sm:px-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-6",
            raised
              ? reduceMotion
                ? "border-border bg-background"
                : "border-border bg-background/88 backdrop-blur-md"
              : "border-transparent border-b-border bg-transparent",
          )}
        >
          {raised ? (
            <>
              <span className="magazine-crop magazine-crop-tl" aria-hidden />
              <span className="magazine-crop magazine-crop-tr" aria-hidden />
            </>
          ) : null}
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
            style={{
              transform: `scaleX(${progress})`,
              opacity: progress > 0.01 ? 1 : 0,
            }}
            aria-hidden
          />

          <Link
            href="/"
            className={cn("flex min-w-0 items-baseline gap-2 py-2", focusRing)}
            data-cursor="→"
            aria-label={`${person.brand} home`}
          >
            <span className="truncate font-mono text-[10px] tracking-[0.22em] text-foreground">
              {person.brand}
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-muted-dim sm:inline">
              Vol. 01
            </span>
          </Link>

          <nav
            className="hidden items-center justify-center md:flex"
            aria-label="Primary"
          >
            {SECTION_NAV.map((link, index) => {
              const isActive = current === link.hash;
              return (
                <Link
                  key={link.hash}
                  href={sectionHref(link.hash, isHome)}
                  data-cursor="→"
                  aria-current={isActive ? "page" : undefined}
                  className={cn("group relative px-2.5 py-3 lg:px-3.5", focusRing)}
                >
                  <span
                    className={cn(
                      "whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted group-hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "text-accent"
                          : "text-muted-dim group-hover:text-accent",
                      )}
                    >
                      {folioIndex(index)}
                    </span>
                    <span className="ml-1.5">{link.label}</span>
                  </span>
                  <span
                    className={cn(
                      "absolute inset-x-2.5 bottom-1.5 h-px bg-accent transition-opacity lg:inset-x-3.5",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40",
                    )}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-1.5 sm:gap-3">
            <button
              type="button"
              className={cn(
                "hidden items-center gap-2 px-1 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted hover:text-foreground md:inline-flex",
                focusRing,
              )}
              onClick={openPalette}
              aria-label="Open command palette"
              aria-keyshortcuts="Meta+K Control+K"
            >
              <span className="hidden lg:inline">Search</span>
              <kbd className="border border-border px-1.5 py-0.5 text-[9px] tracking-[0.08em] text-muted-dim">
                {shortcut}
              </kbd>
            </button>
            <Link
              href={contactHref}
              data-cursor="→"
              aria-current={current === "contact" ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                focusRing,
                "px-2 py-1.5 md:border md:px-3",
                current === "contact"
                  ? "text-accent md:border-accent"
                  : "text-foreground hover:text-accent md:border-border md:hover:border-accent",
              )}
            >
              Let&apos;s talk
              <ArrowUpRight className="h-3 w-3" />
            </Link>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex h-8 w-8 items-center justify-center text-muted hover:text-foreground md:hidden",
                    focusRing,
                  )}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? (
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  ) : (
                    <Menu className="h-4 w-4" strokeWidth={1.5} />
                  )}
                </button>
              </SheetTrigger>
              <SheetContent
                showClose={false}
                className="top-[4.75rem] right-3 bottom-3 left-auto h-auto max-h-[calc(100dvh-5.5rem)] w-[min(100%,24rem)] border border-border shadow-none"
              >
                <SheetHeader>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Vol. 01 / Manila
                  </p>
                  <SheetTitle className="font-display text-3xl font-normal tracking-tight">
                    Contents
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col" aria-label="Mobile">
                  {SECTION_NAV.map((link, index) => {
                    const isActive = current === link.hash;
                    return (
                      <SheetClose asChild key={link.hash}>
                        <Link
                          href={sectionHref(link.hash, isHome)}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "flex items-baseline gap-4 border-b border-border py-4 font-mono text-sm uppercase tracking-[0.16em]",
                            focusRing,
                            isActive
                              ? "text-foreground"
                              : "text-muted hover:text-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "w-6",
                              isActive ? "text-accent" : "text-muted-dim",
                            )}
                          >
                            {folioIndex(index)}
                          </span>
                          <span>{link.label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <SheetClose asChild>
                    <Link
                      href={contactHref}
                      className={cn(
                        "mt-8 inline-flex items-center justify-center gap-2 border border-border py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground hover:border-accent hover:text-accent",
                        focusRing,
                      )}
                    >
                      Let&apos;s talk
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </SheetClose>
                  <button
                    type="button"
                    className={cn(
                      "mt-4 text-left font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-foreground",
                      focusRing,
                    )}
                    onClick={openPaletteFromMenu}
                  >
                    Search · {shortcut}
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
