import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: {
    absolute: "Page not found · Al Beltran",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted">
        That URL doesn&apos;t exist on Al Beltran&apos;s portfolio. Try the home
        page, about, projects, or contact.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/about/">About Al Beltran</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/projects/">View projects</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/contact/">Contact</Link>
        </Button>
      </div>
    </Container>
  );
}
