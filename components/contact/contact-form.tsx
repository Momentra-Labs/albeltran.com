"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SOCIAL_LINKS } from "@/lib/constants";
import {
  CONTACT_INBOX,
  CONTACT_LIMITS,
  EMAILJS_CONFIG,
  contactTemplateParams,
  emptyContactValues,
  firstContactError,
  isHoneypotFilled,
  validateContact,
  validateContactField,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 rounded-none border-0 border-b border-border bg-transparent px-0 shadow-none transition-colors placeholder:text-muted-dim/80 focus-visible:border-accent focus-visible:ring-0";

type SendStatus = "idle" | "loading" | "success" | "error";

function sendFailureCopy(error: unknown) {
  const text =
    error &&
    typeof error === "object" &&
    "text" in error &&
    typeof error.text === "string"
      ? error.text
      : "";

  if (/origin|not allowed|forbidden/i.test(text)) {
    return "This browser origin is blocked on the mail service. Email me instead:";
  }

  return "Something went wrong. Email me instead:";
}

export function ContactForm({ className }: { className?: string }) {
  const formId = useId();
  const reduce = Boolean(useReducedMotion());
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>(
    {},
  );
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<SendStatus>("idle");
  const [notice, setNotice] = useState("");
  const [sentTo, setSentTo] = useState("");

  const sending = status === "loading";
  const sent = status === "success";
  const messageCount = values.message.trim().length;

  function showFieldError(field: ContactField) {
    return Boolean((attempted || touched[field]) && errors[field]);
  }

  function setField(field: ContactField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (attempted || touched[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateContactField(field, next),
      }));
    }
    if (status === "error") {
      setStatus("idle");
      setNotice("");
    }
  }

  function markTouched(field: ContactField) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({
      ...current,
      [field]: validateContactField(field, values),
    }));
  }

  function focusField(field: ContactField) {
    const node =
      field === "name"
        ? nameRef.current
        : field === "email"
          ? emailRef.current
          : messageRef.current;
    node?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setAttempted(true);
    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    const first = firstContactError(nextErrors);
    if (first) {
      setStatus("idle");
      setNotice("");
      focusField(first);
      return;
    }

    if (isHoneypotFilled(values)) {
      setStatus("success");
      setSentTo(values.email.trim());
      setNotice("Message sent. I’ll get back to you soon.");
      setValues(emptyContactValues);
      return;
    }

    setStatus("loading");
    setNotice("");

    try {
      await emailjs.send(
        EMAILJS_CONFIG.service,
        EMAILJS_CONFIG.template,
        contactTemplateParams(values),
        { publicKey: EMAILJS_CONFIG.publicKey },
      );
      setSentTo(values.email.trim().toLowerCase());
      setStatus("success");
      setNotice("Message sent. I’ll get back to you soon.");
      setValues(emptyContactValues);
      setErrors({});
      setTouched({});
      setAttempted(false);
    } catch (error) {
      setStatus("error");
      setNotice(sendFailureCopy(error));
    }
  }

  function writeAnother() {
    setStatus("idle");
    setNotice("");
    setSentTo("");
    setValues(emptyContactValues);
    setErrors({});
    setTouched({});
    setAttempted(false);
    queueMicrotask(() => nameRef.current?.focus());
  }

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="sent"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-5"
            role="status"
            aria-live="polite"
          >
            <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-success">
              <Check className="h-3.5 w-3.5" aria-hidden />
              Sent
            </p>
            <p className="font-display text-2xl tracking-tight text-foreground">
              The note is on its way.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              I’ll reply to{" "}
              <span className="text-foreground">{sentTo || "your email"}</span>
              . It lands in {CONTACT_INBOX}.
            </p>
            <Button
              type="button"
              variant="hairline"
              className="h-12 px-8 font-mono text-[11px] uppercase tracking-[0.16em]"
              onClick={writeAnother}
            >
              Write another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.24, ease: [0.23, 1, 0.32, 1] }}
            method="post"
            action={`mailto:${CONTACT_INBOX}`}
            encType="text/plain"
            onSubmit={handleSubmit}
            className="space-y-8"
            noValidate
            aria-busy={sending}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
            >
              <label htmlFor={`${formId}-company`}>Company</label>
              <input
                id={`${formId}-company`}
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.company}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    company: event.target.value,
                  }))
                }
              />
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <Field
                id={`${formId}-name`}
                label="Name"
                error={showFieldError("name") ? errors.name : undefined}
              >
                <Input
                  ref={nameRef}
                  id={`${formId}-name`}
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  maxLength={CONTACT_LIMITS.nameMax}
                  disabled={sending}
                  value={values.name}
                  aria-invalid={showFieldError("name") || undefined}
                  aria-describedby={
                    showFieldError("name") ? `${formId}-name-error` : undefined
                  }
                  onBlur={() => markTouched("name")}
                  onChange={(event) => setField("name", event.target.value)}
                  className={cn(
                    fieldClass,
                    showFieldError("name") && "border-red-400/80",
                  )}
                />
              </Field>
              <Field
                id={`${formId}-email`}
                label="Email"
                error={showFieldError("email") ? errors.email : undefined}
              >
                <Input
                  ref={emailRef}
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  maxLength={CONTACT_LIMITS.emailMax}
                  disabled={sending}
                  value={values.email}
                  aria-invalid={showFieldError("email") || undefined}
                  aria-describedby={
                    showFieldError("email") ? `${formId}-email-error` : undefined
                  }
                  onBlur={() => markTouched("email")}
                  onChange={(event) => setField("email", event.target.value)}
                  className={cn(
                    fieldClass,
                    showFieldError("email") && "border-red-400/80",
                  )}
                />
              </Field>
            </div>

            <Field
              id={`${formId}-message`}
              label="Message"
              error={showFieldError("message") ? errors.message : undefined}
              hint={`${Math.min(messageCount, CONTACT_LIMITS.messageMax)} / ${CONTACT_LIMITS.messageMax}`}
            >
              <Textarea
                ref={messageRef}
                id={`${formId}-message`}
                name="message"
                rows={5}
                placeholder="Role, project, or collaboration — a few lines is enough."
                maxLength={CONTACT_LIMITS.messageMax}
                disabled={sending}
                value={values.message}
                aria-invalid={showFieldError("message") || undefined}
                aria-describedby={
                  showFieldError("message")
                    ? `${formId}-message-error`
                    : `${formId}-message-count`
                }
                onBlur={() => markTouched("message")}
                onChange={(event) => setField("message", event.target.value)}
                className={cn(
                  fieldClass,
                  "min-h-[140px] py-3",
                  showFieldError("message") && "border-red-400/80",
                )}
              />
            </Field>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-dim">
                Typical reply in 2–3 days
              </p>
              <Button
                type="submit"
                variant="hairline"
                className={cn(
                  "h-12 min-w-[11rem] px-8 font-mono text-[11px] uppercase tracking-[0.16em]",
                  sending && "contact-send-busy",
                )}
                disabled={sending}
                aria-disabled={sending}
              >
                {sending ? (
                  <>
                    <LoaderCircle
                      className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none"
                      aria-hidden
                    />
                    Sending
                  </>
                ) : (
                  <>
                    Send note
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </>
                )}
              </Button>
            </div>

            <p
              role="status"
              aria-live="polite"
              className={cn(
                "font-mono text-[11px] tracking-[0.08em]",
                status === "error" ? "text-red-400" : "text-muted-dim",
              )}
            >
              {status === "error" ? (
                <>
                  {notice}{" "}
                  <a
                    href={SOCIAL_LINKS.email}
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    {CONTACT_INBOX}
                  </a>
                </>
              ) : (
                notice
              )}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <Label htmlFor={id} className="font-mono text-[10px] tracking-[0.18em]">
          {label}
        </Label>
        {hint ? (
          <p
            id={`${id}-count`}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dim"
          >
            {hint}
          </p>
        ) : null}
      </div>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="font-mono text-[10px] tracking-[0.08em] text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
