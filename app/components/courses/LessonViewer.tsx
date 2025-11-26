"use client";

import type { FC } from "react";
import type { Course, Module } from "../../lib/models/course";

type LessonViewerProps = {
  course: Course;
  activeModule: Module | null;
  onSelectModule: (module: Module) => void;
  onModuleCompleted?: (module: Module) => void;
};

const LessonViewer: FC<LessonViewerProps> = ({
  course,
  activeModule,
  onSelectModule,
  onModuleCompleted,
}) => {
  const modules = course.modules;
  const current = activeModule ?? modules[0];

  if (!modules.length) {
    return <p className="text-muted">No modules for this course yet.</p>;
  }

  function handleExplainSimple() {
    // Placeholder – later we can open an AI-powered explanation panel
    alert(
      "In the final version, this button will ask the AI to explain this module in simpler terms."
    );
  }

  function handleGeneratePractice() {
    alert(
      "In the final version, this button will ask the AI to generate extra practice questions for this module."
    );
  }

  function handleMarkCompleted() {
    if (onModuleCompleted && current) {
      onModuleCompleted(current);
    }
  }

  return (
    <div className="lesson-layout">
      <aside className="lesson-sidebar">
        <h3
          style={{
            fontSize: "0.95rem",
            margin: "0 0 0.6rem",
          }}
        >
          Modules
        </h3>
        <div>
          {modules.map((mod, idx) => {
            const isActive = mod.id === current.id;
            return (
              <button
                key={mod.id}
                type="button"
                className={
                  "lesson-module-item" +
                  (isActive ? " lesson-module-item-active" : "")
                }
                onClick={() => onSelectModule(mod)}
              >
                <span className="lesson-module-title">
                  {idx + 1}. {mod.title}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <section>
        <h2 className="lesson-main-title">{current.title}</h2>
        <div className="lesson-content">{current.content}</div>

        <div className="lesson-meta">
          {current.learningOutcomes.length > 0 && (
            <div>
              <h4>Learning outcomes</h4>
              <ul className="module-outcomes">
                {current.learningOutcomes.map((outcome, idx) => (
                  <li key={idx}>{outcome}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lesson-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleExplainSimple}
          >
            Explain in simple terms
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleGeneratePractice}
          >
            Generate practice questions
          </button>
          {onModuleCompleted && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleMarkCompleted}
            >
              Mark module as completed
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default LessonViewer;
