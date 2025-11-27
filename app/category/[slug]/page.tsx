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
import styles from "./CategoryPage.module.css";
import Image from "next/image";

const techTopics = [
  { id: "python-intro", title: "Introduction to Python", icon: "🐍" },
  { id: "react-beginners", title: "React for Beginners", icon: "⚛️" },
  { id: "data-analysis-basics", title: "Data Analysis Basics", icon: "📊" },
  { id: "web-dev-fundamentals", title: "Web Development Fundamentals", icon: "🌐" },
];

const mathTopics = [
  { id: "algebra-basics", title: "Algebra Basics", icon: "𝑥" },
  { id: "calculus-intro", title: "Introduction to Calculus", icon: "∫" },
  { id: "statistics-fundamentals", title: "Statistics Fundamentals", icon: "📈" },
  { id: "geometry-concepts", title: "Geometry Concepts", icon: "△" },
];

const scienceTopics = [
  { id: "biology-basics", title: "Biology Basics", icon: "🧬" },
  { id: "chemistry-fundamentals", title: "Chemistry Fundamentals", icon: "⚗️" },
  { id: "physics-principles", title: "Physics Principles", icon: "⚡" },
  { id: "earth-science", title: "Earth Science", icon: "🌍" },
];

const languageTopics = [
  { id: "spanish-basics", title: "Spanish Basics", icon: "🇪🇸" },
  { id: "french-fundamentals", title: "French Fundamentals", icon: "🇫🇷" },
  { id: "english-grammar", title: "English Grammar", icon: "🇬🇧" },
  { id: "german-intro", title: "German Introduction", icon: "🇩🇪" },
];

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const category = categories.find((c) => c.slug === slug);

  const [customTopic, setCustomTopic] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get topics based on category
  const getTopics = () => {
    switch (slug) {
      case "technology":
        return techTopics;
      case "math":
        return mathTopics;
      case "science":
        return scienceTopics;
      case "languages":
        return languageTopics;
      default:
        return [];
    }
  };

  const topics = getTopics();

  if (!category) {
    return (
      <>
        <Navbar />
        <PageContainer>
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>🔍</div>
            <h2>Category Not Found</h2>
            <p>The category you're looking for doesn't exist.</p>
            <button 
              onClick={() => router.push("/dashboard")}
              className={styles.backButton}
            >
              Back to Dashboard
            </button>
          </div>
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

  return (
    <>
      <Navbar />
      <PageContainer className={styles.categoryPage}>
        {/* Category Header */}
        <header className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <div className={styles.categoryIcon}>{category.icon && (
              <Image src={category.icon} alt={category.name} width={64} height={64}></Image>
            )}</div>
            <div className={styles.textContent}>
              <div className={styles.kicker}>
                <span>🎯 AI-Powered Learning</span>
              </div>
              <h1 className={styles.categoryTitle}>{category.name}</h1>
              <p className={styles.categoryDescription}>{category.description}</p>
              <div className={styles.categoryStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{topics.length}</span>
                  <span className={styles.statLabel}>Pre-built Topics</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>∞</span>
                  <span className={styles.statLabel}>Custom Topics</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {error && (
          <Alert variant="error" className={styles.alert}>
            {error}
          </Alert>
        )}

        <div className={styles.contentGrid}>
          {/* Popular Topics Section */}
          <section className={styles.topicsSection}>
            <div className={styles.sectionHeader}>
              <h2>Popular Topics</h2>
              <p>Get started quickly with these pre-built learning paths</p>
            </div>

            {topics.length === 0 ? (
              <div className={styles.emptyTopics}>
                <div className={styles.emptyIcon}>📚</div>
                <h3>No Pre-built Topics Yet</h3>
                <p>Create your own custom topic below to get started.</p>
              </div>
            ) : (
              <div className={styles.topicsGrid}>
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    className={styles.topicCard}
                    onClick={() => handleOpenTopic(topic.title)}
                    disabled={loading}
                  >
                    <div className={styles.topicIcon}>{topic.icon}</div>
                    <div className={styles.topicContent}>
                      <h3 className={styles.topicTitle}>{topic.title}</h3>
                      <p className={styles.topicLevel}>Beginner Level</p>
                    </div>
                    <div className={styles.topicArrow}>
                      {loading ? <Spinner size={16} /> : "→"}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Custom Topic Section */}
          <section className={styles.customSection}>
            <div className={styles.sectionHeader}>
              <h2>Create Your Own Topic</h2>
              <p>Customize your learning experience with AI</p>
            </div>

            <form className={styles.customForm} onSubmit={handleCustomTopic}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  What do you want to learn?
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="e.g. Next.js basics, Machine Learning fundamentals, Spanish conversation..."
                    className={styles.input}
                    disabled={loading}
                  />
                </label>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Learning Level
                  <select
                    value={level}
                    onChange={(e) =>
                      setLevel(e.target.value as "beginner" | "intermediate" | "advanced")
                    }
                    className={styles.select}
                    disabled={loading}
                  >
                    <option value="beginner">👶 Beginner - New to the topic</option>
                    <option value="intermediate">🚀 Intermediate - Some experience</option>
                    <option value="advanced">🎯 Advanced - Deepen knowledge</option>
                  </select>
                </label>
              </div>

              <button
                className={styles.createButton}
                type="submit"
                disabled={loading || !customTopic.trim()}
              >
                {loading ? (
                  <>
                    <Spinner size={20} />
                    <span>Creating Your Course...</span>
                  </>
                ) : (
                  <>
                    <span className={styles.buttonIcon}>✨</span>
                    <span>Create Course With AI</span>
                  </>
                )}
              </button>

              <div className={styles.formTips}>
                <h4>💡 Tips for better courses:</h4>
                <ul>
                  <li>Be specific about what you want to learn</li>
                  <li>Mention any particular focus areas</li>
                  <li>Include practical applications you're interested in</li>
                </ul>
              </div>
            </form>
          </section>
        </div>
      </PageContainer>
    </>
  );
}