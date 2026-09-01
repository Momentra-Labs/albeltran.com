"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none transition-colors placeholder:text-muted-dim/80 focus-visible:border-accent focus-visible:ring-0";

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const service = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
    const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE;

    if (!publicKey || !service || !template) {
      setStatus("error");
      setMessage("Contact form is not configured yet.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      emailjs.init(publicKey);
      await emailjs.sendForm(service, template, form);
      setStatus("success");
      setMessage("Message sent. I’ll get back to you soon.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please email me directly instead.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-8", className)}
      noValidate
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="name" className="font-mono text-[10px] tracking-[0.18em]">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="email" className="font-mono text-[10px] tracking-[0.18em]">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>
      </div>
      <div className="space-y-3">
        <Label htmlFor="message" className="font-mono text-[10px] tracking-[0.18em]">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Role, project, or collaboration — a few lines is enough."
          className={cn(fieldClass, "min-h-[140px] py-3")}
        />
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
          Typical reply in 2–3 days
        </p>
        <Button
          type="submit"
          variant="hairline"
          className="h-12 px-8 font-mono text-[11px] uppercase tracking-[0.16em]"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending" : "Send note"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "font-mono text-[11px] tracking-[0.08em]",
          status === "error"
            ? "text-red-400"
            : status === "success"
              ? "text-success"
              : "text-muted-dim",
        )}
      >
        {message}
      </p>
    </form>
  );
}
