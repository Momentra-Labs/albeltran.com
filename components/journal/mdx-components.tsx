import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { slugifyHeading } from "@/lib/headings";
import { CodeBlock } from "@/components/journal/code-block";

function headingText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(headingText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const props = node.props as { children?: ReactNode };
    return headingText(props.children);
  }
  return "";
}

function Heading({
  as: Tag,
  children,
  ...props
}: ComponentPropsWithoutRef<"h2"> & { as: "h2" | "h3" }) {
  const id = slugifyHeading(headingText(children));
  return (
    <Tag id={id} {...props}>
      {children}
    </Tag>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <Heading as="h2" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <Heading as="h3" {...props} />
  ),
  pre: ({ children }: { children?: ReactNode }) => {
    if (
      children &&
      typeof children === "object" &&
      "props" in children
    ) {
      const code = children as {
        props: { children?: ReactNode; className?: string };
      };
      return (
        <CodeBlock className={code.props.className}>
          {code.props.children}
        </CodeBlock>
      );
    }
    return <CodeBlock>{children}</CodeBlock>;
  },
};
