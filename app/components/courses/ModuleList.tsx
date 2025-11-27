"use client";

import type { FC } from "react";
import type { Module } from "../../lib/models/course";
import styles from "./ModuleList.module.css";

type ModuleListProps = {
  modules: Module[];
  completedModuleIds?: string[];
  onStartModule?: (module: Module) => void;
};

const ModuleList: FC<ModuleListProps> = ({ modules, completedModuleIds = [], onStartModule }) => {
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
        <span className={styles.moduleCount}>
          {completedModuleIds.length}/{modules.length} completed
        </span>
      </div>
      
      <div className={styles.modulesGrid}>
        {modules.map((mod, index) => {
          const isCompleted = completedModuleIds.includes(mod.id);
          
          return (
            <div 
              key={mod.id} 
              className={`${styles.moduleCard} ${isCompleted ? styles.completed : ''}`}
            >
              <div className={styles.moduleHeader}>
                <div className={`${styles.moduleNumber} ${isCompleted ? styles.completedNumber : ''}`}>
                  {isCompleted ? "✓" : index + 1}
                </div>
                <div className={styles.moduleInfo}>
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <p className={styles.moduleSummary}>{mod.summary}</p>
                </div>
                <div className={`${styles.moduleBadge} ${isCompleted ? styles.completedBadge : ''}`}>
                  {isCompleted ? "Completed" : `Module ${index + 1}`}
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
                    className={`${styles.startButton} ${isCompleted ? styles.reviewButton : ''}`}
                    onClick={() => onStartModule(mod)}
                  >
                    {isCompleted ? "Review Module" : "Start Module"}
                    <span className={styles.buttonIcon}>→</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleList;