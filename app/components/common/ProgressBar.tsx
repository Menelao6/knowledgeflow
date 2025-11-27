import type { FC } from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, label, className = "" }) => {
  const progress = Math.max(0, Math.min(100, value));
  
  return (
    <div className={`${styles.progressBar} ${className}`}>
      <div className={styles.progressHeader}>
        {label && <span className={styles.label}>{label}</span>}
        <span className={styles.percentage}>{progress}%</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;