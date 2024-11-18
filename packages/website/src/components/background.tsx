"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { DotPattern } from "@juanpernu/ui";

export const Background = () => {
  return (
    <DotPattern
      className={cn(
        "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
      )}
    />
  );
};
