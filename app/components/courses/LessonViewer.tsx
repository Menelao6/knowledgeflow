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

  const fallbackModule = modules[0] ?? null;

  if (!modules.length || !fallbackModule) {
    return <p className="text-muted">No modules for this course yet.</p>;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            disabled={loadingExplain}
          >
            {loadingExplain ? (
              <>
                <Spinner size={16} /> <span>Explaining...</span>
              </>
            ) : (
              "Explain in simple terms"
            )}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleGeneratePractice}
            disabled={loadingPractice}
          >
            {loadingPractice ? (
              <>
                <Spinner size={16} /> <span>Generating questions...</span>
              </>
            ) : (
              "Generate practice questions"
            )}
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

        {error && (
          <div style={{ marginTop: "1rem" }}>
            <Alert variant="error">{error}</Alert>
          </div>
        )}

        {loadingExplain && !simpleText && (
          <div style={{ marginTop: "1rem" }}>
            <Spinner size={22} />{" "}
            <span style={{ fontSize: "0.9rem" }}>
              Explaining this module in simple terms...
            </span>
          </div>
        )}

        {simpleText && (
          <div style={{ marginTop: "1rem" }}>
            <Alert variant="info">{simpleText}</Alert>
          </div>
        )}

        {loadingPractice && !practice && (
          <div style={{ marginTop: "1rem" }}>
            <Spinner size={22} />{" "}
            <span style={{ fontSize: "0.9rem" }}>
              Generating extra practice questions...
            </span>
          </div>
        )}

        {practice && (
          <div style={{ marginTop: "1rem" }}>
            <h4 style={{ margin: "0 0 0.4rem", fontSize: "0.95rem" }}>
              Practice Questions
            </h4>
            <ul style={{ fontSize: "0.9rem", paddingLeft: "1.2rem" }}>
              {practice.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default LessonViewer;
