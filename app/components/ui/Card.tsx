import type { FC, ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  border?: boolean;
  className?: string;
  variant?: "default" | "accent" | "highlight";
}

const Card: FC<CardProps> = ({
  children,
  hover = true,
  border = true,
  className = "",
  variant = "default",
}) => {
  const variantClass = styles[variant];
  const hoverClass = hover ? styles.cardHover : "";
  const borderClass = border ? styles.border : styles.noBorder;

  return (
    <div
      className={`
        ${styles.card}
        ${variantClass}
        ${hoverClass}
        ${borderClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;