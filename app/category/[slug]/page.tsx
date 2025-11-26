"use client";

import { FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/layout/navbar";
import PageContainer from "../../components/layout/PageContainer";
import { categories } from "../../lib/data/categories";
import { generateCourseFromTopic } from "../../lib/ai/client";
import { upsertCourse } from "../../lib/storage/courseStorage";
import Alert from "../../components/common/Alert";
import Spinner from "../../components/common/Spinner";

const techTopics = [
  { id: "python-intro", title: "Introduction to Python" },
  { id: "react-beginners", title: "React for Beginners" },
  { id: "data-analysis-basics", title: "Data Analysis Basics" },
  { id: "web-dev-fundamentals", title: "Web Development Fundamentals" },
];

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const category = categories.find((c) => c.slug === slug);

  const [customTopic, setCustomTopic] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">(
    "beginner"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!category) {
    return (
      <>
        <Navbar />
        <PageContainer>
          <p>Category not found.</p>
        </PageContainer>
      </>
    );
  }

  async function handleCustomTopic(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!customTopic.trim()) {
      setError("Please describe what you want to learn.");
      return;
    }

    try {
      setLoading(true);
      const course = await generateCourseFromTopic({
        category: category!.name,
        topic: customTopic,
        level,
      });
      upsertCourse(course);
      router.push(`/course/${course.id}`);
    } catch (err) {
      console.error(err);
      setError(
        "Could not create the course from this topic. Check your OpenAI key and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleOpenTopic(title: string) {
    setError(null);
    try {
      setLoading(true);
      const course = await generateCourseFromTopic({
        category: category!.name,
        topic: title,
        level: "beginner",
      });
      upsertCourse(course);
      router.push(`/course/${course.id}`);
    } catch (err) {
      console.error(err);
      setError(
        "Could not generate this topic course. Please try again or pick another topic."
      );
    } finally {
      setLoading(false);
    }
  }

  const topics = slug === "technology" ? techTopics : [];

  return (
    <>
      <Navbar />
      <PageContainer>
        <h1>{category!.name} Courses</h1>
        <p>Choose a topic or create your own custom mini-course.</p>

        {error && (
          <div style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}>
            <Alert variant="error">{error}</Alert>
          </div>
        )}

        <section className="section">
          <h2>Popular topics</h2>
          {topics.length === 0 ? (
            <p className="text-muted">
              No predefined topics yet for this category. Create your own below.
            </p>
          ) : (
            <div className="list">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  className="topic-item"
                  onClick={() => handleOpenTopic(topic.title)}
                  disabled={loading}
                >
                  <span>{topic.title}</span>
                  {loading && <Spinner size={14} />}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <h2>Create your own topic</h2>
          <form className="custom-topic-form" onSubmit={handleCustomTopic}>
            <label>
              What do you want to learn?
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g. Next.js basics"
              />
            </label>

            <label>
              Level
              <select
                value={level}
                onChange={(e) =>
                  setLevel(
                    e.target.value as "beginner" | "intermediate" | "advanced"
                  )
                }
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size={16} /> <span>Creating...</span>
                </>
              ) : (
                "Create Course With AI"
              )}
            </button>
          </form>
        </section>
      </PageContainer>
    </>
  );
}
