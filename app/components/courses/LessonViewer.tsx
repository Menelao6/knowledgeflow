"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import type { Course, Module } from "../../lib/models/course";
import {
  explainModule,
  generatePracticeQuestions,
} from "../../lib/ai/client";
import Spinner from "../common/Spinner";
import Alert from "../common/Alert";
import styles from "./LessonViewer.module.css";

type LessonViewerProps = {
  course: Course;
  activeModule: Module | null;
  onSelectModule: (module: Module) => void;
  onModuleCompleted?: (module: Module) => void;
  completedModuleIds?: string[];
};

const LessonViewer: FC<LessonViewerProps> = ({
  course,
  activeModule,
  onSelectModule,
  onModuleCompleted,
  completedModuleIds,
}) => {
  const modules = course.modules;
  const fallbackModule = modules[0] ?? null;

  if (!modules.length || !fallbackModule) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📚</div>
        <h3>No Modules Available</h3>
        <p>Course modules will be generated when you create your course.</p>
      </div>
    );
  }

  const current = activeModule ?? fallbackModule;

  const [simpleText, setSimpleText] = useState<string | null>(null);
  const [practice, setPractice] = useState<string[] | null>(null);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [loadingPractice, setLoadingPractice] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // When the current module changes, reset the extra AI outputs
  useEffect(() => {
    setSimpleText(null);
    setPractice(null);
    setError(null);
    setLoadingExplain(false);
    setLoadingPractice(false);
  }, [current.id]);

  async function handleExplainSimple() {
    setError(null);
    setSimpleText(null);
    setLoadingExplain(true);

    try {
      const result = await explainModule({
        title: current.title,
        content: current.content,
      });
      setSimpleText(result);
    } catch (err) {
      console.error(err);
      setError("Failed to get simplified explanation. Please try again.");
    } finally {
      setLoadingExplain(false);
    }
  }

  async function handleGeneratePractice() {
    setError(null);
    setPractice(null);
    setLoadingPractice(true);

    try {
      const result = await generatePracticeQuestions({
        title: current.title,
        content: current.content,
      });
      setPractice(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate practice questions. Please try again.");
    } finally {
      setLoadingPractice(false);
    }
  }

  function handleMarkCompleted() {
    if (onModuleCompleted) {
      onModuleCompleted(current);
    }
  }

  return (
    <div className={styles.lessonViewer}>
      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>Course Modules</h3>
            <span className={styles.moduleCount}>{modules.length} modules</span>
          </div>
          <nav className={styles.moduleNav}>
            {modules.map((mod, idx) => {
  const isActive = mod.id === current.id;
  const isCompleted = completedModuleIds?.includes(mod.id);
  
  return (
    <button
      key={mod.id}
      type="button"
      className={`${styles.moduleItem} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
      onClick={() => onSelectModule(mod)}
    >
      <div className={`${styles.moduleNumber} ${isCompleted ? styles.completedNumber : ''}`}>
        {isCompleted ? "✓" : idx + 1}
      </div>
      <div className={styles.moduleInfo}>
        <div className={styles.moduleTitle}>{mod.title}</div>
        <div className={styles.moduleSummary}>{mod.summary}</div>
      </div>
      {isCompleted && (
        <div className={styles.completionIndicator}>
          ✓
        </div>
      )}
    </button>
  );
})}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <header className={styles.lessonHeader}>
            <div className={styles.moduleBadge}>Module {modules.findIndex(m => m.id === current.id) + 1}</div>
            <h1 className={styles.lessonTitle}>{current.title}</h1>
            {current.summary && (
              <p className={styles.lessonSummary}>{current.summary}</p>
            )}
          </header>

          <div className={styles.lessonContent}>
            <div className={styles.contentCard}>
              <h3>Lesson Content</h3>
              <div className={styles.contentText}>{current.content}</div>
            </div>

            {current.learningOutcomes.length > 0 && (
              <div className={styles.outcomesCard}>
                <h3>Learning Outcomes</h3>
                <ul className={styles.outcomesList}>
                  {current.learningOutcomes.map((outcome, idx) => (
                    <li key={idx}>{outcome}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* AI Tools */}
          <div className={styles.aiTools}>
            <h3>AI Learning Tools</h3>
            <div className={styles.toolGrid}>
              <button
                type="button"
                className={styles.toolButton}
                onClick={handleExplainSimple}
                disabled={loadingExplain}
              >
                <span className={styles.toolIcon}>✨</span>
                <span className={styles.toolContent}>
                  <strong>Explain Simply</strong>
                  <span>Get a simplified explanation</span>
                </span>
                {loadingExplain && <Spinner size={16} />}
              </button>

              <button
                type="button"
                className={styles.toolButton}
                onClick={handleGeneratePractice}
                disabled={loadingPractice}
              >
                <span className={styles.toolIcon}>❓</span>
                <span className={styles.toolContent}>
                  <strong>Practice Questions</strong>
                  <span>Generate extra practice</span>
                </span>
                {loadingPractice && <Spinner size={16} />}
              </button>
            </div>
          </div>

          {/* AI Outputs */}
          {error && (
            <Alert variant="error" className={styles.alert}>
              {error}
            </Alert>
          )}

          {simpleText && (
            <div className={styles.aiOutput}>
              <h4>Simple Explanation</h4>
              <div className={styles.outputContent}>{simpleText}</div>
            </div>
          )}

          {practice && (
            <div className={styles.aiOutput}>
              <h4>Practice Questions</h4>
              <ul className={styles.practiceList}>
                {practice.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Completion */}
          {onModuleCompleted && (
            <div className={styles.completionSection}>
              <button
                type="button"
                className={styles.completeButton}
                onClick={handleMarkCompleted}
              >
                <span>Mark as Completed</span>
                <span>✓</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LessonViewer;