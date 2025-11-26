// lib/ai/client.ts
import type { Course } from "../models/course";

/**
 * Generate a full Course from raw notes.
 * Calls: POST /api/generate-course
 */
export async function generateCourseFromNotes(input: {
  notes: string;
  subject: string;
  title?: string;
}): Promise<Course> {
  const res = await fetch("/api/generate-course", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    console.error("[generateCourseFromNotes] error:", await safeReadError(res));
    throw new Error("Failed to generate course from notes");
  }

  const course = (await res.json()) as Course;
  return course;
}

/**
 * Generate a full Course from a category + topic + level.
 * Calls: POST /api/generate-topic-course
 */
export async function generateCourseFromTopic(input: {
  category: string;
  topic: string;
  level: "beginner" | "intermediate" | "advanced";
}): Promise<Course> {
  const res = await fetch("/api/generate-topic-course", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    console.error("[generateCourseFromTopic] error:", await safeReadError(res));
    throw new Error("Failed to generate course from topic");
  }

  const course = (await res.json()) as Course;
  return course;
}

/**
 * Ask the AI to explain a module in simpler terms.
 * Calls: POST /api/explain-module
 */
export async function explainModule(input: {
  title: string;
  content: string;
}): Promise<string> {
  const res = await fetch("/api/explain-module", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    console.error("[explainModule] error:", await safeReadError(res));
    throw new Error("Failed to explain module");
  }

  const data = (await res.json()) as { explanation?: string };
  return data.explanation ?? "No explanation returned.";
}

/**
 * Ask the AI to generate extra practice questions for a module.
 * Calls: POST /api/generate-practice
 */
export async function generatePracticeQuestions(input: {
  title: string;
  content: string;
}): Promise<string[]> {
  const res = await fetch("/api/generate-practice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    console.error(
      "[generatePracticeQuestions] error:",
      await safeReadError(res)
    );
    throw new Error("Failed to generate practice questions");
  }

  const data = (await res.json()) as { questions?: string[] };
  return data.questions ?? [];
}

/**
 * Helper to safely read response text for logging.
 */
async function safeReadError(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return `HTTP ${res.status}`;
  }
}
