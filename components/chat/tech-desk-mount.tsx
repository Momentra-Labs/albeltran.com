"use client";

import dynamic from "next/dynamic";

export const TechDeskMount = dynamic(() =>
  import("@/components/chat/tech-desk").then((mod) => mod.TechDesk),
);
