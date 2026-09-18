import { certificationsByCategory } from "@/content/certifications";
import { cn } from "@/lib/utils";

export function CertificationsList({ className }: { className?: string }) {
  const rooms = certificationsByCategory();

  return (
    <div className={cn("space-y-8", className)}>
      {rooms.map((room) =>
        room.items.length === 0 ? null : (
          <section key={room.id} aria-labelledby={`cert-list-${room.id}`}>
            <p
              id={`cert-list-${room.id}`}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent"
            >
              {room.label}
            </p>
            <ol className="mt-3 grid gap-3 sm:grid-cols-2">
              {room.items.map((cert) => (
                <li key={cert.id} className="min-w-0">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VIEW"
                    className="flex h-full min-h-11 flex-col border border-border p-4 transition-colors hover:border-border-bright"
                  >
                    <p className="font-display text-xl tracking-tight break-words text-foreground sm:text-[1.35rem]">
                      {cert.name}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {cert.issuer}
                      <span className="text-muted-dim"> · {cert.issued}</span>
                    </p>
                    <span className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      Verify →
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        ),
      )}
    </div>
  );
}
