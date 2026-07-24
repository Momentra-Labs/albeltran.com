"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
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
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Your name</Label>
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Jane Smith"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@company.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell me about the role, project, or collaboration."
        />
      </div>
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
      <p
        role="status"
        aria-live="polite"
        className={
          status === "error"
            ? "text-sm text-red-400"
            : status === "success"
              ? "text-sm text-success"
              : "text-sm text-muted"
        }
      >
        {message}
      </p>
    </form>
  );
}
