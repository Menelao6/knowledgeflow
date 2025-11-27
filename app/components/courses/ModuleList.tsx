"use client";

import type { FC } from "react";
import type { Module } from "../../lib/models/course";
import styles from "./ModuleList.module.css";

type ModuleListProps = {
  modules: Module[];
  onStartModule?: (module: Module) => void;
};

const ModuleList: FC<ModuleListProps> = ({ modules, onStartModule }) => {
  if (!modules.length) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📚</div>
        <h3>No Modules Available</h3>
        <p>Course modules will be generated when you create your course.</p>
      </div>
    );
  }

  return (
    <div className={styles.moduleList}>
      <div className={styles.header}>
        <h2>Course Modules</h2>
        <span className={styles.moduleCount}>{modules.length} modules</span>
      </div>
      
      <div className={styles.modulesGrid}>
        {modules.map((mod, index) => (
          <div key={mod.id} className={styles.moduleCard}>
            <div className={styles.moduleHeader}>
              <div className={styles.moduleNumber}>
                {index + 1}
              </div>
              <div className={styles.moduleInfo}>
                <h3 className={styles.moduleTitle}>{mod.title}</h3>
                <p className={styles.moduleSummary}>{mod.summary}</p>
              </div>
              <div className={styles.moduleBadge}>
                Module {index + 1}
              </div>
            </div>

            {mod.learningOutcomes.length > 0 && (
              <div className={styles.outcomesSection}>
                <h4>What you'll learn:</h4>
                <ul className={styles.outcomesList}>
                  {mod.learningOutcomes.map((outcome, idx) => (
                    <li key={idx} className={styles.outcomeItem}>
                      <span className={styles.outcomeIcon}>✓</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {onStartModule && (
              <div className={styles.moduleActions}>
                <button
                  type="button"
                  className={styles.startButton}
                  onClick={() => onStartModule(mod)}
                >
                  Start Module
                  <span className={styles.buttonIcon}>→</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleList;