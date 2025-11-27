import type { FC, ReactNode } from "react";
import styles from "./Tabs.module.css";

interface Tab {
  id: string;
  label: ReactNode; // Change from string to ReactNode
}

interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

const Tabs: FC<TabsProps> = ({ tabs, activeId, onChange, className = "" }) => {
  return (
    <div className={`${styles.tabs} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeId === tab.id ? styles.active : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;