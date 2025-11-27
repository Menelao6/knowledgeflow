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
      {/* HEADER */}
      <div className={styles.formHeader}>
        <div className={styles.kicker}>
          <span>✨ Create Your Course</span>
        </div>
        <h1 className={styles.title}>Transform Your Notes into a Course</h1>
        <p className={styles.subtitle}>
          Paste lecture notes, textbook excerpts, or study materials and let LearnMate AI 
          transform them into structured modules, interactive quizzes, and smart flashcards.
        </p>
      </div>

      {/* ERROR ALERT */}
      {error && (
        <Alert variant="error" className={styles.alert}>
          {error}
        </Alert>
      )}

      {/* MAIN FORM */}
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        {/* TOP ROW: TITLE & SUBJECT */}
        <div className={styles.formGrid}>
          {/* Course Title Input */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <span>Course Title (Optional)</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Introduction to Quantum Physics"
                className={styles.input}
              />
              <span className={styles.hint}>
                Leave blank and AI will suggest one based on your notes
              </span>
            </label>
          </div>

          {/* Subject/Category Select */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <span>Subject / Category</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={styles.select}
              >
                <option>Technology</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>Languages</option>
                <option>Exam Prep</option>
                <option>Business</option>
                <option>History</option>
                <option>Arts & Design</option>
              </select>
            </label>
          </div>
        </div>

        {/* NOTES TEXTAREA */}
        <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
          <label className={styles.label}>
            <span>Your Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={14}
              placeholder={`Paste your notes here...

Examples:
• Photosynthesis: Light-dependent reactions capture energy from photons...
• React Hooks: useState, useEffect, useContext for state management...
• Calculus: Derivatives measure the rate of change of a function...

Pro tip: Start with one focused topic for the best results`}
              className={styles.textarea}
            />
            <span className={styles.hint}>
              💡 Tip: More focused topics (500-2000 words) generate better structured courses
            </span>
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <div className={styles.formActions}>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size={20} />
                <span>Generating Your Course...</span>
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

      {/* FEATURES SECTION */}
      <div className={styles.features}>
        <h3 className={styles.featuresTitle}>What You'll Get</h3>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📚</span>
            <h4>Structured Modules</h4>
            <p>Clear learning path with organized concepts and outcomes</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>❓</span>
            <h4>Smart Quizzes</h4>
            <p>AI-generated questions to test your comprehension</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎴</span>
            <h4>Flashcards</h4>
            <p>Key concepts optimized for spaced repetition learning</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📊</span>
            <h4>Progress Tracking</h4>
            <p>Track your learning journey and mastery levels</p>
          </div>
        </div>
      </div>
    </div>
  );
}