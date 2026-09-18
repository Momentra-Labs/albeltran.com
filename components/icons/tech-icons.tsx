import type { CSSProperties, ReactElement, SVGProps } from "react";
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

const AWS_ORANGE = { from: "#c8511b", to: "#ff9900" };
const AWS_GREEN = { from: "#1b660f", to: "#6cae3e" };
const AWS_PINK = { from: "#b0084d", to: "#ff4f8b" };

function AwsTile({
  from,
  to,
  children,
  className,
  style: _style,
  id: _id,
  ...props
}: IconProps & { from: string; to: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      aria-hidden
      className={cn("aws-tile h-4 w-4 shrink-0 overflow-hidden rounded-[2px]", className)}
      style={
        {
          "--aws-from": from,
          "--aws-to": to,
          background: `linear-gradient(135deg, ${from}, ${to})`,
        } as CSSProperties
      }
      {...props}
    >
      <g style={{ fill: "#fff" }}>{children}</g>
    </svg>
  );
}

function LambdaIcon(props: IconProps) {
  return (
    <AwsTile id="aws-tile-lambda" {...AWS_ORANGE} {...props}>
      <path
        fill="#fff"
        d="M89.624 211.2H49.89l43.945-91.853 19.912 40.992zm7.079-100.63a3.22 3.22 0 0 0-2.887-1.805h-.01a3.2 3.2 0 0 0-2.886 1.82L41.913 213.022a3.203 3.203 0 0 0 2.893 4.58l46.848-.001a3.21 3.21 0 0 0 2.9-1.83l25.65-54.08a3.18 3.18 0 0 0-.016-2.762zM207.985 211.2h-39.477L105.174 78.624a3.21 3.21 0 0 0-2.897-1.824h-25.83l.03-32h50.626l63.042 132.573a3.21 3.21 0 0 0 2.897 1.827h14.943zm3.208-38.4h-16.121L132.03 40.227a3.21 3.21 0 0 0-2.9-1.827H73.273a3.206 3.206 0 0 0-3.208 3.197l-.035 38.4c0 .851.333 1.664.94 2.265.6.602 1.414.938 2.267.938h27.017l63.337 132.576a3.2 3.2 0 0 0 2.893 1.824h44.709a3.203 3.203 0 0 0 3.207-3.2V176c0-1.766-1.434-3.2-3.207-3.2"
      />
    </AwsTile>
  );
}

function S3Icon(props: IconProps) {
  return (
    <AwsTile id="aws-tile-s3" {...AWS_GREEN} {...props}>
      <path
        fill="#fff"
        d="m194.675 137.256 1.229-8.652c11.33 6.787 11.478 9.59 11.475 9.667-.02.016-1.952 1.629-12.704-1.015m-6.218-1.728c-19.584-5.926-46.857-18.438-57.894-23.654 0-.045.013-.086.013-.131 0-4.24-3.45-7.69-7.693-7.69-4.237 0-7.687 3.45-7.687 7.69s3.45 7.69 7.687 7.69c1.862 0 3.552-.695 4.886-1.8 12.986 6.148 40.048 18.478 59.776 24.302l-7.801 55.059q-.033.225-.032.451c0 4.848-21.463 13.754-56.532 13.754-35.44 0-57.13-8.906-57.13-13.754q0-.22-.028-.435l-16.3-119.062c14.108 9.712 44.454 14.85 73.478 14.85 28.979 0 59.273-5.12 73.41-14.802zM48 65.528c.23-4.21 24.428-20.73 75.2-20.73 50.764 0 74.966 16.516 75.2 20.73v1.437c-2.784 9.443-34.144 19.434-75.2 19.434-41.127 0-72.503-10.023-75.2-19.479zm156.8.07c0-11.087-31.79-27.2-81.6-27.2-49.812 0-81.6 16.113-81.6 27.2l.3 2.414 17.754 129.676c.426 14.503 39.1 19.91 63.526 19.91 30.31 0 62.512-6.969 62.928-19.9l7.668-54.07c4.265 1.02 7.776 1.542 10.595 1.542 3.785 0 6.345-.925 7.897-2.774 1.274-1.517 1.76-3.354 1.396-5.31-.83-4.428-6.087-9.202-16.794-15.311l7.603-53.639z"
      />
    </AwsTile>
  );
}

function SqsIcon(props: IconProps) {
  return (
    <AwsTile id="aws-tile-sqs" {...AWS_PINK} {...props}>
      <path
        fill="#fff"
        d="m91.894 139.8 9.607-9.49a3.18 3.18 0 0 0 .944-2.246 3.17 3.17 0 0 0-.932-2.253l-9.606-9.599-4.54 4.486 4.12 4.12H76.83v6.364h14.71l-4.16 4.107zm73.315.29 12.808-9.551a3.19 3.19 0 0 0 1.278-2.542 3.19 3.19 0 0 0-1.281-2.549l-12.808-9.538-3.843 5.09 5.123 3.818h-12.808v6.364h12.805L161.36 135zM112.666 128c0 6.755-1.169 13.124-3.352 18.666 5.76-2.214 12.257-3.321 18.748-3.321 6.49 0 12.987 1.107 18.744 3.321-2.18-5.542-3.349-11.911-3.349-18.666s1.169-13.12 3.35-18.666c-11.518 4.425-25.972 4.425-37.493 0 2.183 5.545 3.352 11.911 3.352 18.666M96.98 158.884a3.163 3.163 0 0 1 0-4.499c5.812-5.775 9.283-15.64 9.283-26.385 0-10.744-3.471-20.61-9.283-26.385a3.163 3.163 0 0 1 0-4.499 3.213 3.213 0 0 1 4.528 0c12.408 12.329 40.701 12.329 53.11 0a3.213 3.213 0 0 1 4.527 0 3.163 3.163 0 0 1 0 4.499c-5.812 5.775-9.283 15.64-9.283 26.385 0 10.744 3.471 20.61 9.283 26.385a3.163 3.163 0 0 1 0 4.499 3.2 3.2 0 0 1-2.264.932c-.82 0-1.64-.312-2.264-.932-12.408-12.329-40.701-12.329-53.109 0a3.213 3.213 0 0 1-4.528 0m114.224-30.868c0-2.965-1.162-5.752-3.272-7.85a11.16 11.16 0 0 0-7.9-3.244c-2.86 0-5.722 1.078-7.9 3.245-4.357 4.327-4.357 11.368 0 15.698 4.355 4.327 11.438 4.33 15.8 0a11 11 0 0 0 3.272-7.85m1.255 12.348c-3.426 3.404-7.925 5.106-12.427 5.106s-9-1.702-12.427-5.106c-6.856-6.809-6.856-17.887 0-24.696 6.856-6.815 18.005-6.809 24.854 0 6.856 6.809 6.856 17.887 0 24.696M67.136 128.089c0-2.965-1.162-5.752-3.272-7.849a11.13 11.13 0 0 0-7.9-3.252 11.15 11.15 0 0 0-7.9 3.252 11 11 0 0 0-3.269 7.85 11 11 0 0 0 3.27 7.848c4.223 4.19 11.578 4.19 15.799 0a11 11 0 0 0 3.272-7.849m1.255 12.348c-3.426 3.404-7.925 5.106-12.427 5.106-4.499 0-8.998-1.702-12.427-5.106-6.85-6.809-6.85-17.887 0-24.696 6.856-6.808 18.002-6.808 24.854 0 6.853 6.809 6.853 17.887 0 24.696m107.276 35.102c-12.783 12.705-29.783 19.698-47.862 19.698-18.085 0-35.081-6.993-47.864-19.698-8.767-8.708-13.593-19.115-16.097-26.308l-6.052 2.08c2.725 7.827 7.993 19.163 17.621 28.727 13.993 13.907 32.597 21.562 52.392 21.562 19.792 0 38.396-7.655 52.39-21.562 8.085-8.027 14.524-18.233 18.139-28.736l-6.058-2.062c-3.305 9.602-9.203 18.944-16.61 26.3M63.84 106.772l-6.045-2.087c3.874-11.084 10.137-21.291 17.637-28.74C89.419 62.053 108.017 54.4 127.805 54.4c19.79 0 38.387 7.652 52.37 21.546 7.893 7.842 14.512 18.316 18.153 28.74l-6.046 2.086c-3.34-9.544-9.401-19.14-16.635-26.327-12.773-12.695-29.766-19.682-47.842-19.682-18.078 0-35.068 6.987-47.845 19.682-6.826 6.786-12.552 16.137-16.119 26.327"
      />
    </AwsTile>
  );
}

function ApiGatewayIcon(props: IconProps) {
  return (
    <AwsTile id="aws-tile-apigw" {...AWS_PINK} {...props}>
      <path
        fill="#fff"
        d="M109.008 178.024h9.392v-6.455h-9.392zM124.8 178.024h9.6v-6.455h-9.6zM86.4 46.814 44.8 67.463v128.356l41.6 14.068zM92.8 87.659v83.91h9.6v6.455h-9.6v36.349c0 1.039-.496 2.014-1.331 2.62a3.18 3.18 0 0 1-2.887.44l-48-16.23a3.23 3.23 0 0 1-2.182-3.06V65.452c0-1.226.694-2.353 1.789-2.895l48-23.824a3.16 3.16 0 0 1 3.1.155 3.23 3.23 0 0 1 1.511 2.74v39.576h9.6v6.455zM140.8 178.024h9.6v-6.455h-9.6zM141.008 87.659h9.392v-6.455h-9.392zM125.008 87.659h9.392v-6.455h-9.392zM109.008 87.659h9.392v-6.455h-9.392zM211.2 67.463 169.6 46.814v163.073l41.6-14.068zM217.6 198.143c0 1.384-.877 2.617-2.182 3.06l-48 16.23a3.18 3.18 0 0 1-2.887-.44 3.24 3.24 0 0 1-1.331-2.62v-36.349h-6.192v-6.455H163.2V87.659h-6.192v-6.455H163.2V41.628c0-1.117.573-2.153 1.51-2.74a3.16 3.16 0 0 1 3.101-.155l48 23.824A3.23 3.23 0 0 1 217.6 65.452zM137.389 108.181l-5.978-2.317-16 41.955 5.978 2.317zM159.062 128.668c1.252-1.262 1.252-3.305 0-4.563l-12.8-12.91 4.525-4.563 10.538 10.628-10.538 10.627 4.525 4.564zM109.738 141.578l-12.8-12.91c-1.252-1.262-1.252-3.305 0-4.563l12.8-12.91 4.525 4.563-10.538 10.628 10.538 10.627z"
      />
    </AwsTile>
  );
}

function Ec2Icon(props: IconProps) {
  return (
    <AwsTile id="aws-tile-ec2" {...AWS_ORANGE} {...props}>
      <path
        fill="#fff"
        d="M86.4 169.6h80v-80h-80zm86.4-80h12.8V96h-12.8v12.8h12.8v6.4h-12.8v9.6h12.8v6.4h-12.8V144h12.8v6.4h-12.8v12.8h12.8v6.4h-12.8v.435a5.97 5.97 0 0 1-5.965 5.965h-.435v12.8H160V176h-12.8v12.8h-6.4V176h-9.6v12.8h-6.4V176H112v12.8h-6.4V176H92.8v12.8h-6.4V176h-.435A5.97 5.97 0 0 1 80 170.035v-.435h-9.6v-6.4H80v-12.8h-9.6V144H80v-12.8h-9.6v-6.4H80v-9.6h-9.6v-6.4H80V96h-9.6v-6.4H80v-.435a5.97 5.97 0 0 1 5.965-5.965h.435V70.4h6.4v12.8h12.8V70.4h6.4v12.8h12.8V70.4h6.4v12.8h9.6V70.4h6.4v12.8H160V70.4h6.4v12.8h.435a5.97 5.97 0 0 1 5.965 5.965zm-41.6 121.203a.4.4 0 0 1-.397.397H45.197a.4.4 0 0 1-.397-.397v-85.606a.4.4 0 0 1 .397-.397H64v-6.4H45.197a6.805 6.805 0 0 0-6.797 6.797v85.606a6.805 6.805 0 0 0 6.797 6.797h85.606a6.805 6.805 0 0 0 6.797-6.797V195.2h-6.4zm86.4-165.606v85.606a6.805 6.805 0 0 1-6.797 6.797H192v-6.4h18.803a.4.4 0 0 0 .397-.397V45.197a.4.4 0 0 0-.397-.397h-85.606a.4.4 0 0 0-.397.397V64h-6.4V45.197a6.805 6.805 0 0 1 6.797-6.797h85.606a6.805 6.805 0 0 1 6.797 6.797"
      />
    </AwsTile>
  );
}

function StepFunctionsIcon(props: IconProps) {
  return (
    <AwsTile id="aws-tile-sfn" {...AWS_PINK} {...props}>
      <path
        fill="#fff"
        d="M144 140.8h67.2v-22.4H144zm70.4-28.8h-73.6a3.2 3.2 0 0 0-3.2 3.2V144a3.2 3.2 0 0 0 3.2 3.2h73.6a3.2 3.2 0 0 0 3.2-3.2v-28.8a3.2 3.2 0 0 0-3.2-3.2m-75.2 88c0 6.176-5.024 11.2-11.2 11.2s-11.2-5.024-11.2-11.2 5.024-11.2 11.2-11.2 11.2 5.024 11.2 11.2m-94.4-49.6h57.6v-12.8H44.8zm0-32h57.6v-12.8H44.8zm72-62.4c0-6.176 5.024-11.2 11.2-11.2s11.2 5.024 11.2 11.2-5.024 11.2-11.2 11.2-11.2-5.024-11.2-11.2m62.4 113.6H76.8v-12.8h28.8a3.2 3.2 0 0 0 3.2-3.2v-19.2a3.2 3.2 0 0 0-3.2-3.2H76.8v-6.4h28.8a3.2 3.2 0 0 0 3.2-3.2v-19.2a3.2 3.2 0 0 0-3.2-3.2H76.8v-9.6h102.4v12.8h6.4v-16a3.2 3.2 0 0 0-3.2-3.2h-51.2v-9.907c8.18-1.51 14.4-8.682 14.4-17.293 0-9.706-7.898-17.6-17.6-17.6s-17.6 7.894-17.6 17.6c0 8.611 6.22 15.782 14.4 17.293V83.2H73.6a3.2 3.2 0 0 0-3.2 3.2v12.8H41.6a3.2 3.2 0 0 0-3.2 3.2v19.2a3.2 3.2 0 0 0 3.2 3.2h28.8v6.4H41.6a3.2 3.2 0 0 0-3.2 3.2v19.2a3.2 3.2 0 0 0 3.2 3.2h28.8v16a3.2 3.2 0 0 0 3.2 3.2h51.2v6.707c-8.18 1.51-14.4 8.682-14.4 17.293 0 9.706 7.898 17.6 17.6 17.6s17.6-7.894 17.6-17.6c0-8.611-6.22-15.782-14.4-17.293V176h51.2a3.2 3.2 0 0 0 3.2-3.2v-15.914h-6.4z"
      />
    </AwsTile>
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

function PythonIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"
      />
    </Mark>
  );
}

function KubernetesIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <circle cx="12" cy="12" r="2.15" fill="currentColor" />
      <circle cx="12" cy="12" r="5.45" stroke="currentColor" strokeWidth="1.35" />
      <rect x="11.2" y="1.3" width="1.6" height="3.15" rx="0.35" fill="currentColor" />
      <rect x="11.2" y="1.3" width="1.6" height="3.15" rx="0.35" fill="currentColor" transform="rotate(51.4 12 12)" />
      <rect x="11.2" y="1.3" width="1.6" height="3.15" rx="0.35" fill="currentColor" transform="rotate(102.8 12 12)" />
      <rect x="11.2" y="1.3" width="1.6" height="3.15" rx="0.35" fill="currentColor" transform="rotate(154.3 12 12)" />
      <rect x="11.2" y="1.3" width="1.6" height="3.15" rx="0.35" fill="currentColor" transform="rotate(205.7 12 12)" />
      <rect x="11.2" y="1.3" width="1.6" height="3.15" rx="0.35" fill="currentColor" transform="rotate(257.1 12 12)" />
      <rect x="11.2" y="1.3" width="1.6" height="3.15" rx="0.35" fill="currentColor" transform="rotate(308.6 12 12)" />
    </Mark>
  );
}

function MongodbIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"
      />
    </Mark>
  );
}

function FirebaseIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path fill="#ffa000" d="M5.2 18.8 8.6 4.6 12.1 12.2z" />
      <path fill="#f57c00" d="M8.6 4.6 15.5 8.8 18.8 18.8 12.1 12.2z" />
      <path fill="#ffca28" d="M5.2 18.8h13.6L12.1 12.2z" />
    </Mark>
  );
}

function SupabaseIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"
      />
    </Mark>
  );
}

function VercelIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path fill="currentColor" d="M24 22.525H0l12-21.05 12 21.05z" />
    </Mark>
  );
}

function FlaskIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3.4h6M10.4 3.4v5.1L5.5 19.2h13L13.6 8.5V3.4"
      />
      <path fill="currentColor" d="M7.1 16.1h9.8l1.4 3.1H5.7z" />
    </Mark>
  );
}

function NestIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M7.2 8.8 10 3.6h4l2.8 5.2 3.4 2.2v5.8c0 2.5-3.6 4.8-8.2 4.8s-8.2-2.3-8.2-4.8V11z"
      />
    </Mark>
  );
}

function PowerBiIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M10 12a1 1 0 0 1 1 1v11H4a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1h6Zm-2-.5V7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17h-4.5V13a1.5 1.5 0 0 0-1.5-1.5H8Zm5-6V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v22a1 1 0 0 1-1 1h-3.5V7A1.5 1.5 0 0 0 15 5.5h-2Z"
      />
    </Mark>
  );
}

function SsrsIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <rect x="4" y="3.2" width="16" height="17.6" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <path fill="currentColor" d="M4 3.2h16v4.1H4z" />
      <path stroke="var(--background)" strokeWidth="1.3" strokeLinecap="round" d="M7 5.3h6.2" />
      <path
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        d="M7.2 11h9.6M7.2 14.2h9.6M7.2 17.4h6.4"
      />
    </Mark>
  );
}

function RedisIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M22.71 13.145c-1.66 2.092-3.452 4.483-7.038 4.483-3.203 0-4.397-2.825-4.48-5.12.701 1.484 2.073 2.685 4.214 2.63 4.117-.133 6.94-3.852 6.94-7.239 0-4.05-3.022-6.972-8.268-6.972-3.752 0-8.4 1.428-11.455 3.685C2.59 6.937 3.885 9.958 4.35 9.626c2.648-1.904 4.748-3.13 6.784-3.744C8.12 9.244.886 17.05 0 18.425c.1 1.261 1.66 4.648 2.424 4.648.232 0 .431-.133.664-.365a100.49 100.49 0 0 0 5.54-6.765c.222 3.104 1.748 6.898 6.014 6.898 3.819 0 7.604-2.756 9.33-8.965.2-.764-.73-1.361-1.261-.73zm-4.349-5.013c0 1.959-1.926 2.922-3.685 2.922-.941 0-1.664-.247-2.235-.568 1.051-1.592 2.092-3.225 3.21-4.973 1.972.334 2.71 1.43 2.71 2.619z"
      />
    </Mark>
  );
}

function LinuxIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <ellipse cx="12" cy="8.2" rx="4.1" ry="3.8" fill="currentColor" />
      <path
        fill="currentColor"
        d="M6.4 12.6c.6 4.2 2.4 7.6 5.6 7.6s5-3.4 5.6-7.6c-1.4 1.2-3.4 1.8-5.6 1.8s-4.2-.6-5.6-1.8z"
      />
      <circle cx="10.4" cy="8" r="0.7" fill="var(--background)" />
      <circle cx="13.6" cy="8" r="0.7" fill="var(--background)" />
    </Mark>
  );
}

function WindowsIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path fill="currentColor" d="M3.4 4.6h8.1v6.7H3.4zm9.1 0h8.1v6.7h-8.1zM3.4 12.7h8.1v6.7H3.4zm9.1 0h8.1v6.7h-8.1z" />
    </Mark>
  );
}

function AppleIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        fill="currentColor"
        d="M14.8 6.1c.7-.8 1.2-2 1-3.1-1 .1-2.2.7-2.9 1.5-.6.8-1.2 2-1 3.1 1.1 0 2.2-.6 2.9-1.5zM18.5 8.4c-1.1-.1-2.1.6-2.7.6s-1.7-.7-2.8-.7c-1.5 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7 1.9-1.1 2.7-2.1c.9-1.2 1.2-2.4 1.2-2.5 0 0-2.3-.9-2.3-3.5 0-2.2 1.8-3.2 1.9-3.3-.9-1.4-2.4-1.6-2.9-1.4z"
      />
    </Mark>
  );
}

function AndroidIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        d="M8.2 6.2 6.6 3.6M15.8 6.2 17.4 3.6"
      />
      <path
        fill="currentColor"
        d="M7.2 8.2h9.6a3.2 3.2 0 0 1 3.2 3.2v5.2H4V11.4a3.2 3.2 0 0 1 3.2-3.2z"
      />
      <rect x="4" y="16.8" width="2.2" height="3.6" rx="1.1" fill="currentColor" />
      <rect x="17.8" y="16.8" width="2.2" height="3.6" rx="1.1" fill="currentColor" />
      <circle cx="9.4" cy="11.4" r="0.75" fill="var(--background)" />
      <circle cx="14.6" cy="11.4" r="0.75" fill="var(--background)" />
    </Mark>
  );
}

function IosIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <rect x="6.2" y="2.6" width="11.6" height="18.8" rx="2.6" stroke="currentColor" strokeWidth="1.5" />
      <path stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" d="M10.2 18.8h3.6" />
    </Mark>
  );
}

function WebDevIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.45" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8.4" stroke="currentColor" strokeWidth="1.35" />
      <path stroke="currentColor" strokeWidth="1.35" d="M4.2 9.4h15.6M4.2 14.6h15.6" />
    </Mark>
  );
}

function MobileDevIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <rect x="4.6" y="5.4" width="6.4" height="13.2" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13" y="3.8" width="6.6" height="16.4" rx="1.3" stroke="currentColor" strokeWidth="1.4" />
      <path stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" d="M6.6 16.8h2.4M15.4 17.8h1.8" />
    </Mark>
  );
}

function AdobeAppMark({
  children,
  className,
  ...props
}: IconProps) {
  return (
    <Mark className={className} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="3.2" fill="currentColor" />
      {children}
    </Mark>
  );
}

function PhotoshopIcon(props: IconProps) {
  return (
    <AdobeAppMark {...props}>
      <path
        fill="var(--background)"
        d="M6.3 7.1h3.1c1.7 0 2.7.85 2.7 2.3 0 1.45-1.05 2.35-2.8 2.35H7.9V16H6.3zm1.6 3.5h1.3c.7 0 1.15-.38 1.15-1.05s-.45-1.05-1.15-1.05H7.9z"
      />
    </AdobeAppMark>
  );
}

function IllustratorIcon(props: IconProps) {
  return (
    <AdobeAppMark {...props}>
      <path
        fill="var(--background)"
        d="M8.4 16 12 7.1h1.65L17.2 16h-1.7l-.7-1.95h-3.9L10.2 16zm2.6-3.35h2.6L12.8 9.15z"
      />
    </AdobeAppMark>
  );
}

function AdobeXdIcon(props: IconProps) {
  return (
    <AdobeAppMark {...props}>
      <path
        fill="var(--background)"
        d="M5.9 7.1h1.7l2.2 3.45L12.1 7.1h1.7l-2.85 4.35L14.2 16h-1.75l-2.25-3.55L7.85 16H6.1l3.05-4.55zM15.1 7.1h1.55v6.15c0 .9.4 1.3 1.2 1.3.2 0 .4 0 .55-.05V16c-.25.06-.55.12-.85.12-1.6 0-2.45-.9-2.45-2.4z"
      />
    </AdobeAppMark>
  );
}

function PremiereIcon(props: IconProps) {
  return (
    <AdobeAppMark {...props}>
      <path
        fill="var(--background)"
        d="M6.2 7.1h3.15c1.7 0 2.7.9 2.7 2.3 0 1.45-1.1 2.35-2.8 2.35H7.8V16H6.2zm1.6 3.5h1.35c.7 0 1.15-.38 1.15-1.05s-.45-1.05-1.15-1.05H7.8zM14.15 7.1h1.55V16h-1.55z"
      />
    </AdobeAppMark>
  );
}

function FigmaIcon(props: IconProps) {
  return (
    <Mark {...props}>
      <path fill="#f24e1e" d="M8.4 2.2h3.6a2.6 2.6 0 0 1 0 5.2H8.4z" />
      <path fill="#ff7262" d="M12 2.2h3.6a2.6 2.6 0 1 1 0 5.2H12z" />
      <path fill="#a259ff" d="M8.4 9.4h3.6a2.6 2.6 0 1 1 0 5.2H8.4z" />
      <circle cx="15.6" cy="12" r="2.6" fill="#1abcfe" />
      <circle cx="10.2" cy="19.2" r="2.6" fill="#0acf83" />
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

const ICONS: Record<string, (props: IconProps) => ReactElement> = {
  TypeScript: TypeScriptIcon,
  JavaScript: JavaScriptIcon,
  Python: PythonIcon,
  React: ReactIcon,
  "Next.js": NextIcon,
  "Node.js": NodeIcon,
  Java: JavaIcon,
  PHP: PhpIcon,
  Laravel: LaravelIcon,
  "Spring Boot": SpringIcon,
  NestJS: NestIcon,
  Flask: FlaskIcon,
  PostgreSQL: PostgresIcon,
  MySQL: MysqlIcon,
  MongoDB: MongodbIcon,
  Redis: RedisIcon,
  Docker: DockerIcon,
  Kubernetes: KubernetesIcon,
  Azure: AzureIcon,
  Elasticsearch: ElasticIcon,
  AEM: AdobeIcon,
  Claude: ClaudeIcon,
  Cursor: CursorIcon,
  "HTML/CSS": HtmlIcon,
  SCSS: ScssIcon,
  Express: ExpressIcon,
  Lambda: LambdaIcon,
  "AWS Lambda": LambdaIcon,
  S3: S3Icon,
  "SQS / SNS": SqsIcon,
  "API Gateway": ApiGatewayIcon,
  EC2: Ec2Icon,
  "Step Functions": StepFunctionsIcon,
  AWS: AwsIcon,
  Firebase: FirebaseIcon,
  Supabase: SupabaseIcon,
  Vercel: VercelIcon,
  "Power BI": PowerBiIcon,
  SSRS: SsrsIcon,
  Linux: LinuxIcon,
  Windows: WindowsIcon,
  macOS: AppleIcon,
  MacOS: AppleIcon,
  Android: AndroidIcon,
  iOS: IosIcon,
  IOS: IosIcon,
  "Web Development": WebDevIcon,
  "Mobile App Development": MobileDevIcon,
  Photoshop: PhotoshopIcon,
  "Adobe Photoshop": PhotoshopIcon,
  Illustrator: IllustratorIcon,
  "Adobe Illustrator": IllustratorIcon,
  "Adobe XD": AdobeXdIcon,
  XD: AdobeXdIcon,
  Figma: FigmaIcon,
  "Premiere Pro": PremiereIcon,
  Premiere: PremiereIcon,
};

const ICON_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  React: "#61dafb",
  "Next.js": "#f4f4f5",
  "Node.js": "#5fa04e",
  Java: "#ea2d2e",
  PHP: "#8892bf",
  Laravel: "#ff2d20",
  "Spring Boot": "#6db33f",
  NestJS: "#e0234e",
  Flask: "#eeeeee",
  PostgreSQL: "#336791",
  MySQL: "#4479a1",
  MongoDB: "#47a248",
  Redis: "#ff4438",
  Docker: "#2496ed",
  Kubernetes: "#326ce5",
  Azure: "#0078d4",
  Elasticsearch: "#fecc63",
  AEM: "#eb1000",
  Claude: "#d97757",
  Cursor: "#b4b4ff",
  "HTML/CSS": "#e34f26",
  SCSS: "#cf649a",
  Express: "#e4e4e7",
  Lambda: "#ff9900",
  "AWS Lambda": "#ff9900",
  S3: "#569a31",
  "SQS / SNS": "#e7157b",
  "API Gateway": "#a166ff",
  EC2: "#ed7100",
  "Step Functions": "#e7157b",
  AWS: "#ff9900",
  Firebase: "#ffca28",
  Supabase: "#3ecf8e",
  Vercel: "#f4f4f5",
  "Power BI": "#f2c811",
  SSRS: "#cc2927",
  "REST APIs": "#38d9a9",
  SQL: "#4f8eff",
  "Prompt Engineering": "#e2d2ba",
  "AI Debugging": "#c084fc",
  Linux: "#fcc624",
  Windows: "#0078d6",
  macOS: "#f4f4f5",
  MacOS: "#f4f4f5",
  Android: "#3ddc84",
  iOS: "#5ac8fa",
  IOS: "#5ac8fa",
  "Web Development": "#4f8eff",
  "Mobile App Development": "#a78bfa",
  Photoshop: "#31a8ff",
  "Adobe Photoshop": "#31a8ff",
  Illustrator: "#ff9a00",
  "Adobe Illustrator": "#ff9a00",
  "Adobe XD": "#ff61f6",
  XD: "#ff61f6",
  Figma: "#f24e1e",
  "Premiere Pro": "#9999ff",
  Premiere: "#9999ff",
};

const PAINTED_TILES = new Set([
  "Lambda",
  "AWS Lambda",
  "S3",
  "SQS / SNS",
  "API Gateway",
  "EC2",
  "Step Functions",
  "Firebase",
  "Figma",
]);

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? HashIcon;
  return (
    <Icon
      className={cn("h-4 w-4", className)}
      style={PAINTED_TILES.has(name) ? undefined : { color: ICON_COLORS[name] ?? "#8b8b9c" }}
    />
  );
}
