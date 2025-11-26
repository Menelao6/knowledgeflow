"use client";

import type { FC, ReactNode } from "react";

type AlertVariant = "info" | "error" | "success";

type AlertProps = {
  variant?: AlertVariant;
  children: ReactNode;
};

const Alert: FC<AlertProps> = ({ variant = "info", children }) => {
  let background = "rgba(59, 130, 246, 0.08)"; // info
  let border = "rgba(59, 130, 246, 0.25)";
  let color = "#1d4ed8";

  if (variant === "error") {
    background = "rgba(248, 113, 113, 0.08)";
    border = "rgba(248, 113, 113, 0.4)";
    color = "var(--color-danger)";
  } else if (variant === "success") {
    background = "rgba(45, 212, 191, 0.08)";
    border = "rgba(45, 212, 191, 0.5)";
    color = "var(--color-accent)";
  }

  return (
    <div
      style={{
        borderRadius: "0.8rem",
        padding: "0.6rem 0.8rem",
        border: `1px solid ${border}`,
        backgroundColor: background,
        color,
        fontSize: "0.85rem",
      }}
    >
      {children}
    </div>
  );
};

export default Alert;
