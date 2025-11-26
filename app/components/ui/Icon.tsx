import type { FC, ReactNode } from "react";
import styles from "./Icon.module.css";

interface IconProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "accent" | "text" | "muted";
  className?: string;
  animate?: boolean;
}

const Icon: FC<IconProps> = ({
  children,
  size = "md",
  color = "primary",
  className = "",
  animate = false,
}) => {
  const sizeClass = styles[size];
  const colorClass = styles[color];
  const animationClass = animate ? styles.animate : "";

  return (
    <div
      className={`
        ${styles.icon}
        ${sizeClass}
        ${colorClass}
        ${animationClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Icon;