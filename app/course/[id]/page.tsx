"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/layout/navbar";
import PageContainer from "../../components/layout/PageContainer";
import type { Course, Module } from "../../lib/models/course";
import { getCourseById, upsertCourse } from "../../lib/storage/courseStorage";
import CourseTabs from "../../components/courses/CourseTabs";
import ProgressBar from "../../components/common/ProgressBar";
import styles from "./CoursePage.module.css";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const found = getCourseById(id);
    if (!found) {
      router.push("/dashboard");
    } else {
      setCourse(found);
    }
    setLoading(false);
  }, [id, router]);

  function updateProgress(module: Module) {
    if (!course) return;
    const completed = new Set(course.progress.completedModuleIds);
    completed.add(module.id);
    const updated: Course = {
      ...course,
      progress: {
        ...course.progress,
        completedModuleIds: Array.from(completed),
        lastVisitedModuleId: module.id,
      },
    };
    setCourse(updated);
    upsertCourse(updated);
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <PageContainer>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <h2>Loading Course...</h2>
            <p>Getting your learning materials ready</p>
          </div>
        </PageContainer>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Navbar />
        <PageContainer>
          <div className={styles.errorState}>
            <div className={styles.errorIcon}>📚</div>
            <h2>Course Not Found</h2>
            <p>The course you're looking for doesn't exist or has been removed.</p>
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

  const totalModules = course.modules.length || 1;
  const completedCount = course.progress.completedModuleIds.length;
  const progress = Math.round((completedCount / totalModules) * 100);

  const getCourseIcon = () => {
    const category = course.category?.toLowerCase() || "general";
    if (category.includes("tech") || category.includes("programming")) return "💻";
    if (category.includes("math")) return "π";
    if (category.includes("science")) return "🔬";
    if (category.includes("language")) return "🌐";
    if (category.includes("business")) return "💼";
    if (category.includes("history")) return "📜";
    if (category.includes("art")) return "🎨";
    return "📚";
  };

  return (
    <>
      <Navbar />
      <PageContainer className={styles.coursePage}>
        {/* Course Header */}
        <header className={styles.courseHeader}>
          <div className={styles.headerContent}>
            <div className={styles.courseInfo}>
              <div className={styles.courseIcon}>{getCourseIcon()}</div>
              <div className={styles.textContent}>
                <div className={styles.kicker}>
                  <span>🎓 Learning Path</span>
                </div>
                <h1 className={styles.courseTitle}>{course.title}</h1>
                <div className={styles.courseMeta}>
                  {course.category && (
                    <span className={styles.categoryBadge}>{course.category}</span>
                  )}
                  {course.source === "notes" && (
                    <span className={styles.sourceBadge}>From your notes</span>
                  )}
                  <span className={styles.moduleCount}>
                    {totalModules} modules • {course.quiz.length} quiz questions • {course.flashcards.length} flashcards
                  </span>
                </div>
                {course.description && (
                  <p className={styles.courseDescription}>{course.description}</p>
                )}
              </div>
            </div>
            
            <div className={styles.progressSection}>
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>Your Progress</span>
                <span className={styles.progressPercentage}>{progress}%</span>
              </div>
              <ProgressBar 
                value={progress} 
                label={`${completedCount}/${totalModules} modules completed`}
                className={styles.progressBar}
              />
              <div className={styles.progressStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{completedCount}</span>
                  <span className={styles.statLabel}>Completed</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{totalModules - completedCount}</span>
                  <span className={styles.statLabel}>Remaining</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{totalModules}</span>
                  <span className={styles.statLabel}>Total</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Course Content */}
        <div className={styles.courseContent}>
          <CourseTabs course={course} onModuleCompleted={updateProgress} />
        </div>

        {/* Quick Actions Footer */}
        <footer className={styles.quickActions}>
          <div className={styles.actionButtons}>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={styles.scrollTopButton}
            >
              ↑ Back to Top
            </button>
            <button 
              onClick={() => router.push('/dashboard')}
              className={styles.dashboardButton}
            >
              ← Back to Dashboard
            </button>
          </div>
        </footer>
      </PageContainer>
    </>
  );
}