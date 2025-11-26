// app/upload/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/layout/navbar";
import PageContainer from "../components/layout/PageContainer";
import { generateCourseFromNotes } from "../lib/ai/client";
import { upsertCourse } from "../lib/storage/courseStorage";

export default function UploadPage() {
  const [notes, setNotes] = useState("");
  const [subject, setSubject] = useState("Technology");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!notes.trim()) {
      alert("Please paste some notes first.");
      return;
    }

    try {
      setLoading(true);
      const course = await generateCourseFromNotes({ notes, subject, title });
      upsertCourse(course);
      router.push(`/course/${course.id}`);
    } catch (err) {
      console.error(err);
      alert(
        "Failed to generate your course. Once the AI API is configured, try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <div className="upload-page">
          <h1>Create a Course From Your Notes</h1>
          <p>
            Paste lecture notes, textbook excerpts, or your own summaries and
            let LearnMate AI turn them into structured modules, flashcards, and
            quizzes.
          </p>

          <form className="upload-form" onSubmit={handleSubmit}>
            <label>
              Optional course title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Introduction to Biology"
              />
              <span className="hint">
                If left empty, the AI will suggest a title based on your notes.
              </span>
            </label>

            <label>
              Subject / category
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option>Technology</option>
                <option>Math</option>
                <option>Science</option>
                <option>Languages</option>
                <option>Exam Prep</option>
              </select>
            </label>

            <label>
              Paste your notes
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={12}
                placeholder="Paste your notes here..."
              />
              <span className="hint">
                Tip: Start with one topic (e.g. &quot;Cell structure&quot; or
                &quot;React components&quot;) for better mini-courses.
              </span>
            </label>

            <div className="upload-actions">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate Course"}
              </button>
            </div>
          </form>
        </div>
      </PageContainer>
    </>
  );
}
