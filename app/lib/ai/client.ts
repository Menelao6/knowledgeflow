// lib/ai/client.ts
import type { Course } from "../models/course";

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
    console.error(await res.text());
    throw new Error("Failed to generate course from notes");
  }

  const course = (await res.json()) as Course;
  return course;
}

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
    console.error(await res.text());
    throw new Error("Failed to generate course from topic");
  }

  const course = (await res.json()) as Course;
  return course;
}
