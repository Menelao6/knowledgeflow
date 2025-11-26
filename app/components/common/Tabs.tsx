"use client";

import type { FC, ReactNode } from "react";
import clsx from "clsx";

export type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

const Tabs: FC<TabsProps> = ({ tabs, activeId, onChange }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            className={clsx("tab-button", {
              "tab-button-active": isActive,
            })}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
