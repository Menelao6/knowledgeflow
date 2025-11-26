import type { FC } from "react";
import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ size = 18, className = "" }) => {
  return (
    <span
      aria-label="Loading"
      role="status"
      className={`${styles.spinner} ${className}`}
      style={{ width: size, height: size }}
    />
  );
};

export default Spinner;