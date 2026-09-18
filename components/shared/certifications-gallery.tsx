"use client";

import { useId, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
  certifications,
  certificationsByCategory,
  type Certification,
  type CertificationCategory,
  type CertificationSeal,
} from "@/content/certifications";
import { cn } from "@/lib/utils";

function SealMark({ seal }: { seal: CertificationSeal }) {
  if (seal === "hackerrank") {
    return (
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          fill="currentColor"
          d="M16.4 12.6h4.2v9.2h6.8v-9.2h4.2v22.8h-4.2v-9.6h-6.8v9.6h-4.2z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        fill="currentColor"
        d="m24 8 2.4 10.6L37 21l-10.6 2.4L24 34l-2.4-10.6L11 21l10.6-2.4z"
      />
    </svg>
  );
}

function CertificatePlate({
  cert,
  index,
  total,
}: {
  cert: Certification;
  index: number;
  total: number;
}) {
  return (
    <div className="cert-plate relative flex h-full min-h-0 flex-col overflow-hidden bg-surface-2 p-4 sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,rgba(79,142,255,0.2),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_88%_120%,rgba(226,210,186,0.08),transparent_46%)]" />
      <div className="cert-plate-stock" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(240,240,245,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(240,240,245,0.16)_1px,transparent_1px)] [background-size:28px_28px]" />
      <span className="magazine-crop magazine-crop-tl left-3 top-3" />
      <span className="magazine-crop magazine-crop-tr right-3 top-3" />
      <span className="magazine-crop magazine-crop-bl bottom-3 left-3" />
      <span className="magazine-crop magazine-crop-br bottom-3 right-3" />
      <div className="relative flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          {cert.issuer}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>
      <div className="relative mt-4 flex flex-1 flex-col">
        <div className="text-accent">
          <SealMark seal={cert.seal} />
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Certificate
        </p>
        <p className="mt-2 font-display text-[1.35rem] leading-[0.94] tracking-tight text-foreground sm:text-[1.55rem]">
          {cert.name}
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          Issued {cert.issued}
        </p>
        <span className="mt-auto inline-flex pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Verify →
        </span>
      </div>
    </div>
  );
}

function CertificateScan({ cert }: { cert: Certification }) {
  const image = cert.image;
  if (!image) return null;

  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="VIEW"
      className="group min-w-0"
    >
      <div className="cert-gallery-frame">
        <div className="relative aspect-[3/2] overflow-hidden bg-white">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-contain object-center"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="font-display text-xl tracking-tight text-foreground group-hover:text-accent">
            {cert.name}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {cert.issuer}
            <span className="text-muted-dim"> · {cert.issued}</span>
          </p>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          Verify →
        </span>
      </div>
    </a>
  );
}

function RoomGrid({
  room,
}: {
  room: {
    id: CertificationCategory;
    items: Certification[];
  };
}) {
  if (room.items.some((cert) => cert.image)) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {room.items.map((cert) =>
          cert.image ? (
            <CertificateScan key={cert.id} cert={cert} />
          ) : (
            <a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="VIEW"
              className="cert-gallery-plate block h-full overflow-hidden border border-border transition-colors hover:border-border-bright"
            >
              <CertificatePlate
                cert={cert}
                index={room.items.indexOf(cert)}
                total={room.items.length}
              />
            </a>
          ),
        )}
      </div>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {room.items.map((cert, index) => (
        <li key={cert.id} className="min-w-0">
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="VIEW"
            className="cert-gallery-plate block h-full overflow-hidden border border-border transition-colors hover:border-border-bright"
          >
            <CertificatePlate
              cert={cert}
              index={index}
              total={room.items.length}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function CertificationsGallery({ className }: { className?: string }) {
  const rooms = certificationsByCategory().filter((room) => room.items.length > 0);
  const count = certifications.length;
  const tabsId = useId();
  const [active, setActive] = useState<CertificationCategory>(
    rooms[0]?.id ?? "role",
  );
  const current = rooms.find((room) => room.id === active) ?? rooms[0];

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const index = rooms.findIndex((room) => room.id === active);
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next = rooms[(index + delta + rooms.length) % rooms.length];
    if (!next) return;
    setActive(next.id);
    const tab = event.currentTarget.querySelector<HTMLButtonElement>(
      `[data-cert-tab="${next.id}"]`,
    );
    tab?.focus();
  };

  if (!current) return null;

  return (
    <div
      className={cn("cert-gallery cert-showcase min-w-0", className)}
      aria-label="Licenses and certifications"
    >
      <div className="cert-showcase-wash" aria-hidden />
      <div className="cert-showcase-grid" aria-hidden />
      <div className="cert-showcase-grain" aria-hidden />
      <div className="cert-showcase-vignette" aria-hidden />
      <p className="cert-showcase-folio" aria-hidden>
        {String(count).padStart(2, "0")}
      </p>
      <span className="magazine-crop magazine-crop-tl left-3 top-3 z-[1]" />
      <span className="magazine-crop magazine-crop-tr right-3 top-3 z-[1]" />
      <span className="magazine-crop magazine-crop-bl bottom-3 left-3 z-[1]" />
      <span className="magazine-crop magazine-crop-br bottom-3 right-3 z-[1]" />
      <p className="relative z-[1] mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-dim">
        Press bed / issuer plates
      </p>
      <div
        className="cert-gallery-tabs relative z-[1]"
        role="tablist"
        aria-label="Certificate categories"
        onKeyDown={onTabKeyDown}
      >
        {rooms.map((room) => {
          const selected = room.id === current.id;
          return (
            <button
              key={room.id}
              type="button"
              role="tab"
              id={`${tabsId}-${room.id}`}
              data-cert-tab={room.id}
              aria-selected={selected}
              aria-controls={`${tabsId}-panel-${room.id}`}
              tabIndex={selected ? 0 : -1}
              className="cert-gallery-tab"
              onClick={() => setActive(room.id)}
            >
              {room.label}
            </button>
          );
        })}
      </div>
      <div
        key={current.id}
        className="relative z-[1]"
        role="tabpanel"
        id={`${tabsId}-panel-${current.id}`}
        aria-labelledby={`${tabsId}-${current.id}`}
      >
        <RoomGrid room={current} />
      </div>
    </div>
  );
}
