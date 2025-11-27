import type { FC, ReactNode, ElementType } from "react";
import styles from "./Heading.module.css";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  kicker?: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
  animate?: boolean;
}

const Heading: FC<HeadingProps> = ({
  level = 2,
  children,
  kicker,
  subtitle,
  className = "",
  align = "left",
  animate = true,
}) => {
  const headingSizeClass = styles[`h${level}`];
  const alignClass = styles[align];
  const animationClass = animate ? styles.headingAnimate : "";

  const Tag: ElementType = `h${level}`; 

  return (
    <div className={`${styles.headingContainer} ${alignClass} ${className}`}>
      {kicker && (
        <div className={styles.kicker}>
          <span>✨</span>
          <span>{kicker}</span>
        </div>
      )}
      <Tag
        className={`${styles.heading} ${headingSizeClass} ${animationClass}`}
      >
        {children}
      </Tag>
      {subtitle && (
        <p className={`${styles.subtitle} ${animationClass}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;