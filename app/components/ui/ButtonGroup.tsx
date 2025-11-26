import type { FC, ReactNode } from "react";
import styles from "./ButtonGroup.module.css";

interface ButtonGroupProps {
  children: ReactNode;
  direction?: "row" | "column";
  gap?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
  className?: string;
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  children,
  direction = "row",
  gap = "md",
  align = "start",
  className = "",
}) => {
  const directionClass = direction === "row" ? styles.row : styles.column;
  const gapClass = styles[`gap${gap.charAt(0).toUpperCase() + gap.slice(1)}`];
  const alignClass = styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`];

  return (
    <div
      className={`
        ${styles.buttonGroup}
        ${directionClass}
        ${gapClass}
        ${alignClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;