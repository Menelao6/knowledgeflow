"use client";

import type { FC } from "react";

type SpinnerProps = {
  size?: number; // px
};

const Spinner: FC<SpinnerProps> = ({ size = 18 }) => {
  const borderWidth = Math.max(2, Math.round(size / 9));

  return (
    <span
      aria-label="Loading"
      role="status"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "999px",
        border: `${borderWidth}px solid rgba(148, 163, 184, 0.35)`,
        borderTopColor: "var(--color-primary)",
        animation: "lm-spin 0.7s linear infinite",
      }}
    />
  );
};

export default Spinner;
