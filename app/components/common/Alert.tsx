import type { FC, ReactNode } from "react";
import styles from "./Alert.module.css";

interface AlertProps {
  variant?: "info" | "error" | "success";
  children: ReactNode;
  className?: string;
}

const Alert: FC<AlertProps> = ({ variant = "info", children, className = "" }) => {
  return (
    <div className={`${styles.alert} ${styles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Alert;