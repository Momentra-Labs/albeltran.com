import type { ReactNode } from "react";
import type { Project, ScreenshotViewport } from "@/content/projects";
import { isMobileApp, projectFolio, screenshotForViewport } from "@/content/projects";
import { AppPhoneShowcase } from "@/components/projects/app-phone-slideshow";
import {
  IPadShell,
  IPhoneShell,
  MonitorShell,
} from "@/components/projects/device-chrome";
import { ProjectCover } from "@/components/shared/project-cover";
import { cn } from "@/lib/utils";

function Screen({
  project,
  viewport,
  sizes,
  priority = false,
}: {
  project: Project;
  viewport: ScreenshotViewport;
  sizes: string;
  priority?: boolean;
}) {
  const shot = screenshotForViewport(project, viewport);
  const fitClass =
    shot?.fit === "contain"
      ? "object-contain object-center"
      : shot?.fit === "fill"
        ? "object-fill"
        : "object-top";
  return (
    <ProjectCover
      project={project}
      shot={shot}
      sizes={sizes}
      priority={priority}
      zoomOnHover={false}
      imageClassName={fitClass}
      decorative
    />
  );
}

function DeviceStage({ folio }: { folio?: string | null }) {
  return (
    <div className="device-stage" aria-hidden>
      <span className="device-stage-wash" />
      <span className="device-stage-stock" />
      <span className="device-stage-grid" />
      <span className="device-stage-desk" />
      <span className="device-stage-grain" />
      <span className="device-stage-vignette" />
      <span className="device-stage-mat" />
      {folio ? <span className="device-stage-folio">{folio}</span> : null}
      <span className="device-stage-kicker">Still life · Vol. 01</span>
      <span className="magazine-crop magazine-crop-tl" />
      <span className="magazine-crop magazine-crop-tr" />
      <span className="magazine-crop magazine-crop-bl" />
      <span className="magazine-crop magazine-crop-br" />
      <span className="magazine-register-mark device-stage-register" />
    </div>
  );
}

function Monitor({ children }: { children: ReactNode }) {
  return (
    <div data-device="monitor" className="device-frame">
      <MonitorShell>{children}</MonitorShell>
    </div>
  );
}

function Tablet({ children }: { children: ReactNode }) {
  return (
    <div data-device="tablet" className="device-frame">
      <IPadShell>{children}</IPadShell>
    </div>
  );
}

function Phone({ children }: { children: ReactNode }) {
  return (
    <div data-device="phone" className="device-frame">
      <IPhoneShell>{children}</IPhoneShell>
    </div>
  );
}

const SIZES = {
  spread: {
    desktop: "(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 720px",
    tablet: "(max-width: 640px) 70vw, 360px",
    phone: "(max-width: 640px) 36vw, 180px",
  },
  compact: {
    desktop: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px",
    tablet: "(max-width: 640px) 55vw, 220px",
    phone: "(max-width: 640px) 28vw, 120px",
  },
  phone: {
    desktop: "1px",
    tablet: "1px",
    phone: "(max-width: 640px) 55vw, 240px",
  },
} as const;

const CAPTIONS = {
  spread: "Desktop, tablet, and iPhone 16",
  phone: "Six screens · iPhone 16",
} as const;

export type ClusterVariant = "spread" | "compact" | "phone";

export function clusterVariantFor(
  project: Project,
  surface: "hero" | "card",
): ClusterVariant {
  if (isMobileApp(project)) return "phone";
  return surface === "hero" ? "spread" : "compact";
}

export function DeviceCluster({
  project,
  variant = "spread",
  priority = false,
  framed = variant === "spread",
  className,
}: {
  project: Project;
  variant?: ClusterVariant;
  priority?: boolean;
  framed?: boolean;
  className?: string;
}) {
  const sizes = SIZES[variant];
  const caption =
    variant === "spread"
      ? CAPTIONS.spread
      : variant === "phone" && framed
        ? CAPTIONS.phone
        : null;
  const label =
    caption ??
    (variant === "phone"
      ? `${project.name} on iPhone 16`
      : `${project.name} on desktop, tablet, and iPhone 16`);

  return (
    <div className={cn("group min-w-0", className)}>
      <div
        className={cn(
          "device-cluster",
          `device-cluster-${variant}`,
          framed && "border border-border",
        )}
        role={variant === "phone" ? undefined : "img"}
        aria-label={variant === "phone" ? undefined : label}
        data-surface={variant === "phone" && framed ? "hero" : "card"}
      >
        <DeviceStage
          folio={project.kind === "lab" ? null : projectFolio(project)}
        />
        {variant === "phone" ? (
          <AppPhoneShowcase project={project} compact={!framed} />
        ) : (
          <>
            <Monitor>
              <Screen
                project={project}
                viewport="desktop"
                sizes={sizes.desktop}
                priority={priority}
              />
            </Monitor>
            <Tablet>
              <Screen
                project={project}
                viewport="tablet"
                sizes={sizes.tablet}
              />
            </Tablet>
            <Phone>
              <Screen
                project={project}
                viewport="phone"
                sizes={sizes.phone}
              />
            </Phone>
          </>
        )}
      </div>
      {caption ? (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-dim">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
