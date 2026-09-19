"use client";

import { CertificationsGallery } from "@/components/shared/certifications-gallery";
import { TechStack } from "@/components/shared/tech-stack";
import { useRecruiter } from "@/components/layout/recruiter-provider";

export function RecruiterExtras() {
  const { recruiter } = useRecruiter();
  if (!recruiter) return null;

  return (
    <>
      <TechStack className="mt-6" />
      <h3 className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        Licenses &amp; certifications
      </h3>
      <CertificationsGallery className="mt-3" />
    </>
  );
}
