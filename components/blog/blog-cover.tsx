import Image from "next/image";
import { cn } from "@/lib/utils";

export function BlogCover({
  title,
  category,
  image,
  imageAlt,
  className,
  sizes = "100vw",
  priority = false,
}: {
  title: string;
  category: string;
  image?: string;
  imageAlt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-border bg-surface-2",
        className,
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,rgba(79,142,255,0.18),transparent_52%),radial-gradient(ellipse_at_100%_90%,rgba(240,240,245,0.05),transparent_48%)]"
        />
      )}
      {!image ? (
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            {category}
          </p>
          <p className="font-display text-xl leading-none tracking-tight text-foreground">
            {title}
          </p>
        </div>
      ) : null}
    </div>
  );
}
