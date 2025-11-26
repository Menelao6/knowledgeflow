import type { FC, ReactNode } from "react";
import styles from "./PageContainer.module.css";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer: FC<PageContainerProps> = ({ children, className = "" }) => {
  return (
    <main className={`${styles.pageContainer} ${className}`}>
      {children}
    </main>
  );
};

export default PageContainer;