"use client";

import type { FC } from "react";
import type { Module } from "../../lib/models/course";

type ModuleListProps = {
  modules: Module[];
  onStartModule?: (module: Module) => void;
};

const ModuleList: FC<ModuleListProps> = ({ modules, onStartModule }) => {
  if (!modules.length) {
    return <p className="text-muted">No modules found for this course.</p>;
  }

  return (
    <div className="module-list">
      {modules.map((mod, index) => (
        <div key={mod.id} className="module-card">
          <div className="module-card-header">
            <div className="module-title">
              {index + 1}. {mod.title}
            </div>
            <span className="module-pill">Module {index + 1}</span>
          </div>
          <div className="module-summary">{mod.summary}</div>
          {mod.learningOutcomes.length > 0 && (
            <ul className="module-outcomes">
              {mod.learningOutcomes.map((outcome, idx) => (
                <li key={idx}>{outcome}</li>
              ))}
            </ul>
          )}
          {onStartModule && (
            <div style={{ marginTop: "0.6rem" }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onStartModule(mod)}
              >
                Start module
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModuleList;
