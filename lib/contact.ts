import { SITE_URL } from "@/lib/constants";
import {
  buildInquiryEmailHtml,
  formatInquiryReceived,
  inquirySubject,
  toEmailHtml,
} from "@/lib/contact-email";

export const CONTACT_INBOX = "al.andrew.p.beltran@gmail.com";

export const EMAILJS_CONFIG = {
  publicKey:
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "IW4RGjwqjRI8v2pDy",
  service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE || "service_x2j6fvi",
  template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE || "template_w31okso",
} as const;

export type ContactField = "name" | "email" | "message";

export type ContactValues = {
  name: string;
  email: string;
  message: string;
  company: string;
};

export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  messageMin: 12,
  messageMax: 4000,
} as const;

export const emptyContactValues: ContactValues = {
  name: "",
  email: "",
  message: "",
  company: "",
};

export function normalizeContact(values: ContactValues): ContactValues {
  return {
    name: values.name.replace(/\s+/g, " ").trim(),
    email: values.email.trim().toLowerCase(),
    message: values.message.trim(),
    company: values.company.trim(),
  };
}

export function isHoneypotFilled(values: ContactValues) {
  return normalizeContact(values).company.length > 0;
}

export function validateContactField(
  field: ContactField,
  values: ContactValues,
): string | undefined {
  const next = normalizeContact(values);

  if (field === "name") {
    if (!next.name) return "Name is required.";
    if (next.name.length < CONTACT_LIMITS.nameMin) {
      return `Name needs at least ${CONTACT_LIMITS.nameMin} characters.`;
    }
    if (next.name.length > CONTACT_LIMITS.nameMax) {
      return `Name must be under ${CONTACT_LIMITS.nameMax} characters.`;
    }
    if (!/[\p{L}\p{M}]/u.test(next.name)) return "Enter a real name.";
    if (/https?:\/\//i.test(next.name) || next.name.includes("@")) {
      return "Enter a name, not a link or email.";
    }
    return undefined;
  }

  if (field === "email") {
    if (!next.email) return "Email is required.";
    if (next.email.length > CONTACT_LIMITS.emailMax) {
      return "Email is too long.";
    }
    if (next.email.includes("..") || !EMAIL_PATTERN.test(next.email)) {
      return "Enter a valid email address.";
    }
    return undefined;
  }

  if (!next.message) return "Message is required.";
  if (next.message.length < CONTACT_LIMITS.messageMin) {
    return `Give a little more context — at least ${CONTACT_LIMITS.messageMin} characters.`;
  }
  if (next.message.length > CONTACT_LIMITS.messageMax) {
    return `Message must be under ${CONTACT_LIMITS.messageMax.toLocaleString()} characters.`;
  }
  return undefined;
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  (["name", "email", "message"] as const).forEach((field) => {
    const error = validateContactField(field, values);
    if (error) errors[field] = error;
  });
  return errors;
}

export function firstContactError(
  errors: ContactErrors,
): ContactField | undefined {
  return (["name", "email", "message"] as const).find((field) => errors[field]);
}

export function contactTemplateParams(values: ContactValues) {
  const next = normalizeContact(values);
  const receivedAt = new Date();
  return {
    name: next.name,
    email: next.email,
    message: next.message,
    message_html: toEmailHtml(next.message),
    from_name: next.name,
    from_email: next.email,
    reply_to: next.email,
    to_email: CONTACT_INBOX,
    to_name: "Al Beltran",
    subject: inquirySubject(next.name),
    sent_at: formatInquiryReceived(receivedAt),
    site_url: SITE_URL,
    html: buildInquiryEmailHtml(next, receivedAt, CONTACT_INBOX),
  };
}
