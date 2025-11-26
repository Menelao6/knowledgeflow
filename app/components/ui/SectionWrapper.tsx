import type { FC, ReactNode } from "react";
import styles from "./SectionWrapper.module.css";

interface SectionWrapperProps {
  children: ReactNode;
  bgColor?: "light" | "white" | "primary-soft";
  containerSize?: "sm" | "md" | "lg";
  padding?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

const SectionWrapper: FC<SectionWrapperProps> = ({
  children,
  bgColor = "white",
  containerSize = "lg",
  padding = "lg",
  animate = true,
  className = "",
}) => {
  const bgColorClass = styles[`bg${bgColor.charAt(0).toUpperCase() + bgColor.slice(1)}`];
  const containerSizeClass = styles[`container${containerSize.charAt(0).toUpperCase() + containerSize.slice(1)}`];
  const paddingClass = styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`];
  const animationClass = animate ? styles.sectionAnimate : styles.noAnimation;

  return (
    <section
      className={`
        ${styles.section}
        ${bgColorClass}
        ${animationClass}
        ${className}
      `}
    >
      <div
        className={`
          ${styles.container}
          ${containerSizeClass}
          ${paddingClass}
        `}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;