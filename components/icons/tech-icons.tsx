import type { ReactElement, SVGProps } from "react";
import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement>;

function Mark({ className, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("h-3.5 w-3.5 shrink-0", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

function TypeScriptIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" />
      <path
        fill="var(--background)"
        d="M6.2 8.4h5.8v1.55H10.1v6.05H8.35V9.95H6.2zm6.55 7.6V8.4h1.8v6.15h2.85V16z"
      />
    </Mark>
  );
}

function JavaScriptIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" />
      <path
        fill="var(--background)"
        d="M8.1 16.1c0 1.45-.85 2.15-2.2 2.15-.7 0-1.35-.2-1.85-.55l.7-1.35c.3.25.7.4 1.1.4.5 0 .8-.2.8-.75V8.4h1.45zm4.55 2.2c-1.7 0-2.8-.8-3.35-1.85l1.25-.75c.35.65.95 1.1 1.95 1.1.8 0 1.3-.35 1.3-.85 0-.5-.4-.75-1.4-1.05l-.5-.15c-1.45-.4-2.4-1.15-2.4-2.55 0-1.45 1.15-2.5 2.95-2.5 1.3 0 2.25.45 2.9 1.55l-1.2.8c-.35-.55-.85-.85-1.7-.85-.7 0-1.15.35-1.15.8 0 .5.4.75 1.4 1.05l.5.15c1.55.45 2.45 1.15 2.45 2.6 0 1.55-1.2 2.6-3.2 2.6z"
      />
    </Mark>
  );
}

function ReactIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <circle cx="12" cy="12" r="2.05" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="3.9" stroke="currentColor" strokeWidth="1.35" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.9"
        stroke="currentColor"
        strokeWidth="1.35"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.9"
        stroke="currentColor"
        strokeWidth="1.35"
        transform="rotate(120 12 12)"
      />
    </Mark>
  );
}

function NextIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        fill="currentColor"
        d="M8.2 7.4h1.7l5.9 8.3V7.4H17.6v9.2h-1.7z"
      />
    </Mark>
  );
}

function NodeIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M12 2.2 20.4 7v10L12 21.8 3.6 17V7zM12 4.6 5.6 8.3v7.4L12 19.4l6.4-3.7V8.3z"
      />
      <path fill="currentColor" d="M10.6 9.1h2.8c1.6 0 2.6.9 2.6 2.4 0 1.6-1 2.5-2.7 2.5h-1.1v2.9H10.6zm2.6 3.4c.7 0 1.1-.4 1.1-1s-.4-1-1.1-1h-1v2z" />
    </Mark>
  );
}

function JavaIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        d="M8.5 14.2c2.4 1.4 6.6 1.4 9 0"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        d="M7.6 16.4c3 1.8 8.2 1.8 11.2 0"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        d="M9.2 18.6c2.4 1.2 6.4 1.2 8.8 0"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        d="M12.2 5.2c2.4 2.2-1.2 3.4.6 5.6 0 0 2.4-1.2 1.6-3.2-.6-1.6-2.4-1.6-2.2-2.4z"
      />
    </Mark>
  );
}

function PhpIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <rect x="1.5" y="7.2" width="21" height="9.6" rx="4.8" stroke="currentColor" strokeWidth="1.4" />
      <path
        fill="currentColor"
        d="M5.4 10.1h1.9c1.2 0 1.9.6 1.9 1.6 0 1.1-.7 1.7-1.9 1.7H6.6v1.5H5.4zm1.9 2.2c.45 0 .7-.22.7-.58s-.25-.57-.7-.57H6.6v1.15zM11.1 14.9 12.3 9.1h1.4l-1.2 5.8zm4.1-4.8h1.9c1.2 0 1.9.6 1.9 1.6 0 1.1-.7 1.7-1.9 1.7h-.7v1.5h-1.2zm1.9 2.2c.45 0 .7-.22.7-.58s-.25-.57-.7-.57h-.7v1.15z"
      />
    </Mark>
  );
}

function LaravelIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="m12 3.2 4.6 2.6v3.1L12 11.6 7.4 8.9V5.8zm-5.8 6.4 4.6 2.6v5.2l-4.6 2.6-4.6-2.6v-5.2zm11.6 0 4.6 2.6v5.2l-4.6 2.6-4.6-2.6v-5.2z"
      />
    </Mark>
  );
}

function SpringIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M17.8 6.2c-2.4 2.6-2 6.1-.4 8.5-1.6.9-3.4 1.3-5.3 1.1-3.7-.4-6.6-3.6-6.6-7.4 0-.5.05-1 .15-1.5C3.4 9.4 2.5 12.4 3.2 15.4c1.2 5 6.3 8.1 11.3 6.9 3.8-.9 6.6-4.2 7.1-8.1.4-2.6-.3-5.3-2.2-7.3-.4-.2-1 .2-1.6-.7z"
      />
      <circle cx="16.4" cy="7.4" r="1.15" fill="currentColor" />
    </Mark>
  );
}

function PostgresIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M16.7 4.4c-1.1-.9-3.2-1.2-4.7-1.2-2.6 0-4.4.7-5.4 1.9C5.3 6.6 5 8.4 5.4 10.8c.2 1.3.4 2.1.4 2.1l.9-.2c.1 1.7.6 3.2 1.8 4.1 1.1.8 2.6.9 4.1.5.3 1.1.9 1.9 1.9 2.2 1.4.4 2.8-.3 3.3-1.6.5 1 .8 1.4 1.6 1.6.9.3 1.8-.2 2.2-1 .5-1 .2-2.2-.4-3.6 1.2-2 1.5-4 .8-5.6-.8-1.8-2.6-3-4.3-4.5z"
      />
    </Mark>
  );
}

function MysqlIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M4.2 15.6c3.6-1.4 6.2-6.8 8.6-6.8 1.4 0 2.2 1.1 3.4 1.1 1.6 0 2.6-1.3 3.6-1.3"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M15.4 16.8c1.8 0 3.2-1.2 4.4-1.2"
      />
      <path fill="currentColor" d="M8.2 6.4 9.8 17h1.7L9.7 6.4z" />
    </Mark>
  );
}

function DockerIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <rect x="4.2" y="9.2" width="3" height="2.15" rx="0.25" fill="currentColor" />
      <rect x="7.6" y="9.2" width="3" height="2.15" rx="0.25" fill="currentColor" />
      <rect x="11" y="9.2" width="3" height="2.15" rx="0.25" fill="currentColor" />
      <rect x="14.4" y="9.2" width="3" height="2.15" rx="0.25" fill="currentColor" />
      <rect x="7.6" y="6.7" width="3" height="2.15" rx="0.25" fill="currentColor" />
      <rect x="11" y="6.7" width="3" height="2.15" rx="0.25" fill="currentColor" />
      <rect x="11" y="4.2" width="3" height="2.15" rx="0.25" fill="currentColor" />
      <path
        fill="currentColor"
        d="M3.4 12.4h16.4c.2 1.2.1 2.8-1.1 3.9-1.4 1.2-3.8 1.6-7.1 1.6-4.4 0-7.4-1.2-8.8-4.2z"
      />
    </Mark>
  );
}

function AzureIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path fill="currentColor" d="M13.4 3.2 4.2 20.8h5.5l2.2-4.4 5.3 4.4H21L13.4 3.2zm.2 6.4 3.7 7.4h-4.2z" />
    </Mark>
  );
}

function AwsIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M6.4 6.6h2.1l1.7 6.6 1.9-6.6h2l-3 9.1H9.3zm8.3 0h2v9.1h-2z"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M5.2 18.4c2.8 2 6.4 2.4 13.6.2"
      />
    </Mark>
  );
}

function ElasticIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      <circle cx="12" cy="12" r="5.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.3" />
    </Mark>
  );
}

function AdobeIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path fill="currentColor" d="M2.4 20.8 9.1 3.2h5.8l6.7 17.6h-4.4l-1.1-3.1H7.9l-1.1 3.1zm6.7-6h5.8L12 8.2z" />
    </Mark>
  );
}

function ClaudeIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="m12 2.4 1.4 6.4 6.4 1.4-6.4 1.4L12 18l-1.4-6.4-6.4-1.4 6.4-1.4z"
      />
      <path fill="currentColor" d="m18.4 15.2.7 2.4 2.4.7-2.4.7-.7 2.4-.7-2.4-2.4-.7 2.4-.7z" />
    </Mark>
  );
}

function CursorIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path fill="currentColor" d="M5.2 3.4 19.4 12l-7.2 1.6-1.7 6.8z" />
    </Mark>
  );
}

function HtmlIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path fill="currentColor" d="M4.2 3.2h15.6l-1.4 15.6L12 21.6 5.6 18.8zm2 2.2 5.8 13.2 5.8-13.2H16l-4 9.4-4-9.4z" />
    </Mark>
  );
}

function ScssIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M12.2 4.2c-3.8 0-6.4 1.6-6.4 3.8 0 2.5 2.2 3.3 5.6 3.7 2.5.3 3.4.6 3.4 1.4 0 .9-1 1.4-2.6 1.4-1.8 0-3.5-.5-4.8-1.2l-1.2 2.8c1.4.8 3.6 1.3 5.8 1.3 4.1 0 6.8-1.7 6.8-4.1 0-2.5-2.3-3.4-5.8-3.8-2.4-.3-3.2-.6-3.2-1.3 0-.7.8-1.2 2.2-1.2 1.5 0 3 .4 4.2 1l1.1-2.7c-1.4-.7-3.2-1.1-5.1-1.1z"
      />
    </Mark>
  );
}

function ExpressIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M3.6 12h16.8M6.4 8.2 3.6 12l2.8 3.8M17.6 8.2 20.4 12l-2.8 3.8"
      />
    </Mark>
  );
}

function HashIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M8.2 4.4v15.2M15.8 4.4v15.2M5 9.2h14M5 14.8h14"
      />
    </Mark>
  );
}

const AWS_ITEMS = new Set([
  "Lambda",
  "S3",
  "SQS / SNS",
  "API Gateway",
  "EC2",
  "Step Functions",
  "AWS",
  "AWS Lambda",
]);

const ICONS: Record<string, (props: IconProps) => ReactElement> = {
  TypeScript: TypeScriptIcon,
  JavaScript: JavaScriptIcon,
  React: ReactIcon,
  "Next.js": NextIcon,
  "Node.js": NodeIcon,
  Java: JavaIcon,
  PHP: PhpIcon,
  Laravel: LaravelIcon,
  "Spring Boot": SpringIcon,
  PostgreSQL: PostgresIcon,
  MySQL: MysqlIcon,
  Docker: DockerIcon,
  Azure: AzureIcon,
  Elasticsearch: ElasticIcon,
  AEM: AdobeIcon,
  Claude: ClaudeIcon,
  Cursor: CursorIcon,
  "HTML/CSS": HtmlIcon,
  SCSS: ScssIcon,
  Express: ExpressIcon,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = AWS_ITEMS.has(name) ? AwsIcon : (ICONS[name] ?? HashIcon);
  return <Icon className={className} />;
}
