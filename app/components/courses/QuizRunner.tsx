"use client";

import type { FC, ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import type { QuizQuestion } from "../../lib/models/course";
import styles from "./QuizRunner.module.css";

type QuizRunnerProps = {
  questions: QuizQuestion[];
};

const QuizRunner: FC<QuizRunnerProps> = ({ questions }) => {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  if (!questions.length) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>❓</div>
        <h3>No Quiz Questions</h3>
        <p>Quiz questions will be generated when you create your course.</p>
      </div>
    );
  }

  function handleChange(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
    setCurrentQuestion(0);
  }

  function handleNextQuestion() {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  }

  function handlePrevQuestion() {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
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
  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQ.id] ?? null;

  return (
    <div className={styles.quizRunner}>
      {/* Progress Bar */}
      <div className={styles.quizProgress}>
        <div className={styles.progressInfo}>
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          {!submitted && (
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          )}
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ 
              width: submitted 
                ? `${score?.percent}%` 
                : `${((currentQuestion + 1) / questions.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {!submitted ? (
        /* Quiz Questions */
        <form className={styles.quizForm} onSubmit={handleSubmit}>
          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <h2 className={styles.questionNumber}>Question {currentQuestion + 1}</h2>
              <div className={styles.questionNav}>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next →
                </button>
              </div>
            </div>

            <div className={styles.questionContent}>
              <p className={styles.questionText}>{currentQ.question}</p>
              
              <div className={styles.optionsGrid}>
                {currentQ.options.map((opt, optIdx) => {
                  const inputId = `${currentQ.id}-${optIdx}`;
                  const isSelected = selectedAnswer === optIdx;
                  
                  return (
                    <label 
                      key={optIdx} 
                      className={`${styles.option} ${isSelected ? styles.selected : ''}`}
                      htmlFor={inputId}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name={currentQ.id}
                        value={optIdx}
                        checked={isSelected}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(currentQ.id, Number(e.target.value))
                        }
                        className={styles.radioInput}
                      />
                      <div className={styles.optionContent}>
                        <div className={styles.optionLetter}>
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className={styles.optionText}>{opt}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.quizActions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={Object.keys(answers).length !== questions.length}
            >
              Submit Quiz
            </button>
          </div>
        </form>
      ) : (
        /* Results */
        <div className={styles.results}>
          <div className={styles.scoreCard}>
            <div className={styles.scoreHeader}>
              <div className={styles.scoreIcon}>🎯</div>
              <h2>Quiz Complete!</h2>
              <p>Here's how you did:</p>
            </div>
            
            <div className={styles.scoreDisplay}>
              <div className={styles.scoreCircle}>
                <span className={styles.scorePercent}>{score?.percent}%</span>
                <span className={styles.scoreLabel}>Score</span>
              </div>
              <div className={styles.scoreDetails}>
                <div className={styles.scoreStat}>
                  <span className={styles.statNumber}>{score?.correct}</span>
                  <span className={styles.statLabel}>Correct</span>
                </div>
                <div className={styles.scoreStat}>
                  <span className={styles.statNumber}>{score?.total}</span>
                  <span className={styles.statLabel}>Total</span>
                </div>
              </div>
            </div>

            <div className={styles.scoreMessage}>
              {score?.percent === 100 && (
                <p className={styles.perfectScore}>Perfect score! Excellent work! 🎉</p>
              )}
              {score?.percent && score.percent >= 80 && score.percent < 100 && (
                <p className={styles.goodScore}>Great job! You've mastered most of the material. 🌟</p>
              )}
              {score?.percent && score.percent >= 60 && score.percent < 80 && (
                <p className={styles.fairScore}>Good effort! Review the material and try again. 📚</p>
              )}
              {score?.percent && score.percent < 60 && (
                <p className={styles.poorScore}>Keep practicing! Review the course material and retry. 💪</p>
              )}
            </div>
          </div>

          {/* Question Review */}
          <div className={styles.questionReview}>
            <h3>Question Review</h3>
            <div className={styles.reviewList}>
              {questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctIndex;
                const isCurrent = idx === currentQuestion;
                
                return (
                  <div 
                    key={q.id} 
                    className={`${styles.reviewItem} ${isCurrent ? styles.current : ''}`}
                    onClick={() => setCurrentQuestion(idx)}
                  >
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewNumber}>Q{idx + 1}</span>
                      <span className={`${styles.reviewStatus} ${isCorrect ? styles.correct : styles.incorrect}`}>
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className={styles.reviewQuestion}>{q.question}</p>
                    {!isCorrect && userAnswer !== null && (
                      <div className={styles.answerComparison}>
                        <div className={styles.answerRow}>
                          <span className={styles.answerLabel}>Your answer:</span>
                          <span className={styles.wrongAnswer}>{q.options[userAnswer]}</span>
                        </div>
                        <div className={styles.answerRow}>
                          <span className={styles.answerLabel}>Correct answer:</span>
                          <span className={styles.correctAnswer}>{q.options[q.correctIndex]}</span>
                        </div>
                        {q.explanation && (
                          <div className={styles.explanation}>
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    )}
                    {isCorrect && q.explanation && (
                      <div className={styles.explanation}>
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.resultsActions}>
            <button
              type="button"
              className={styles.retryButton}
              onClick={handleReset}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizRunner;