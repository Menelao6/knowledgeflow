"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { generateCourseFromNotes } from "../../lib/ai/client";
import { upsertCourse } from "../../lib/storage/courseStorage";
import Alert from "../common/Alert";
import Spinner from "../common/Spinner";
import styles from "./UploadForm.module.css";

interface UploadFormProps {
  className?: string;
}

export default function UploadForm({ className = "" }: UploadFormProps) {
  const [notes, setNotes] = useState("");
  const [subject, setSubject] = useState("Technology");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!notes.trim()) {
      setError("Please paste some notes before generating a course.");
      return;
    }

    try {
      setLoading(true);
      const course = await generateCourseFromNotes({ notes, subject, title });
      upsertCourse(course);
      router.push(`/course/${course.id}`);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while generating your course. Check your OpenAI key and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`${styles.uploadFormContainer} ${className}`}>
      <div className={styles.formHeader}>
        <div className={styles.kicker}>
          <span>🚀 Create Course</span>
        </div>
        <h1 className={styles.title}>Transform Your Notes into a Course</h1>
        <p className={styles.subtitle}>
          Paste lecture notes, textbook excerpts, or your own summaries and
          let LearnMate AI turn them into structured modules, flashcards, and
          quizzes.
        </p>
      </div>

      {error && (
        <Alert variant="error" className={styles.alert}>
          {error}
        </Alert>
      )}

      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Optional course title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Introduction to Biology"
                className={styles.input}
              />
              <span className={styles.hint}>
                If left empty, the AI will suggest a title based on your notes.
              </span>
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Subject / category
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={styles.select}
              >
                <option>Technology</option>
                <option>Math</option>
                <option>Science</option>
                <option>Languages</option>
                <option>Exam Prep</option>
                <option>Business</option>
                <option>History</option>
                <option>Arts</option>
              </select>
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Your notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={12}
              placeholder={`Paste your notes here...\n\nExamples:\n• Cell structure: nucleus, mitochondria, cell membrane...\n• React components: functional components, hooks, props...\n• Calculus: derivatives, integrals, limits...`}
              className={styles.textarea}
            />
            <span className={styles.hint}>
              Tip: Start with one focused topic for better mini-courses.
            </span>
          </label>
        </div>

        <div className={styles.formActions}>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size={20} />
                <span>Generating Course...</span>
              </>
            ) : (
              <>
                <span className={styles.buttonIcon}>✨</span>
                <span>Generate Course</span>
              </>
            )}
          </button>
        </div>
      </form>

      <div className={styles.features}>
        <h3 className={styles.featuresTitle}>What you'll get:</h3>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📚</span>
            <div>
              <h4>Structured Modules</h4>
              <p>Organized learning path with clear outcomes</p>
            </div>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>❓</span>
            <div>
              <h4>Interactive Quizzes</h4>
              <p>Test your knowledge with AI-generated questions</p>
            </div>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎴</span>
            <div>
              <h4>Smart Flashcards</h4>
              <p>Key concepts for spaced repetition</p>
            </div>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📊</span>
            <div>
              <h4>Progress Tracking</h4>
              <p>Monitor your learning journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}