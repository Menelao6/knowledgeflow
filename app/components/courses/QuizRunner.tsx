"use client";

import type { FC, ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import type { QuizQuestion } from "../../lib/models/course";

type QuizRunnerProps = {
  questions: QuizQuestion[];
};

const QuizRunner: FC<QuizRunnerProps> = ({ questions }) => {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions.length) {
    return <p className="text-muted">No quiz questions for this course yet.</p>;
  }

  function handleChange(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function computeScore() {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    return {
      correct,
      total: questions.length,
      percent: Math.round((correct / questions.length) * 100),
    };
  }

  const score = submitted ? computeScore() : null;

  return (
    <form className="quiz-shell" onSubmit={handleSubmit}>
      {questions.map((q, idx) => {
        const selectedIndex = answers[q.id] ?? null;
        const isCorrect =
          submitted && selectedIndex === q.correctIndex && selectedIndex !== null;
        const isWrong =
          submitted && selectedIndex !== null && selectedIndex !== q.correctIndex;

        return (
          <div key={q.id} className="quiz-question">
            <div className="quiz-question-title">
              {idx + 1}. {q.question}
            </div>
            <div className="quiz-options">
              {q.options.map((opt, optIdx) => {
                const inputId = `${q.id}-${optIdx}`;
                return (
                  <label key={optIdx} className="quiz-option" htmlFor={inputId}>
                    <input
                      id={inputId}
                      type="radio"
                      name={q.id}
                      value={optIdx}
                      checked={selectedIndex === optIdx}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(q.id, Number(e.target.value))
                      }
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
            {submitted && (
              <div className="quiz-result-message">
                {isCorrect && (
                  <span className="quiz-result-ok">✅ Correct!</span>
                )}
                {isWrong && (
                  <span className="quiz-result-bad">
                    ❌ Not quite. Correct answer:{" "}
                    {q.options[q.correctIndex]}
                    {q.explanation ? ` – ${q.explanation}` : ""}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div>
        <button type="submit" className="btn btn-primary">
          {submitted ? "Recalculate score" : "Submit answers"}
        </button>
        {score && (
          <p className="quiz-result-message" style={{ marginTop: "0.5rem" }}>
            You answered {score.correct} out of {score.total} correctly (
            {score.percent}%)
          </p>
        )}
      </div>
    </form>
  );
};

export default QuizRunner;
