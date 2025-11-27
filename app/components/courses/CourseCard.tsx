"use client";

import type { FC } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Course } from "../../lib/models/course";
import ProgressBar from "../common/ProgressBar";
import styles from "./CourseCard.module.css";

type CourseCardProps = {
  course: Course;
  onRemove?: (courseId: string) => void;
};

const CourseCard: FC<CourseCardProps> = ({ course, onRemove }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalModules = course.modules.length || 1;
  const completed = course.progress.completedModuleIds.length;
  const progress = Math.round((completed / totalModules) * 100);

  const subtitleParts = [];
  if (course.source === "notes") subtitleParts.push("From your notes");
  if (course.category) subtitleParts.push(course.category);
  const subtitle = subtitleParts.join(" • ") || "AI-generated mini course";

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

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleConfirmRemove = () => {
    onRemove?.(course.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelRemove = () => {
    setShowDeleteConfirm(false);
  };

  // Don't render modal until mounted to prevent hydration issues
  if (!isMounted) {
    return <CourseCardContent 
      course={course} 
      onRemove={onRemove} 
      progress={progress} 
      totalModules={totalModules} 
      completed={completed} 
      subtitle={subtitle} 
      getCourseIcon={getCourseIcon}
      onRemoveClick={handleRemoveClick}
    />;
  }

  return (
    <>
      <CourseCardContent 
        course={course} 
        onRemove={onRemove} 
        progress={progress} 
        totalModules={totalModules} 
        completed={completed} 
        subtitle={subtitle} 
        getCourseIcon={getCourseIcon}
        onRemoveClick={handleRemoveClick}
      />
      
      {/* Modal rendered outside the card to prevent positioning issues */}
      {showDeleteConfirm && (
        <div className={styles.modalOverlay} onClick={handleCancelRemove}>
          <div className={styles.confirmationModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Remove Course</h3>
              <button 
                type="button" 
                className={styles.closeButton}
                onClick={handleCancelRemove}
              >
                ×
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.warningIcon}>⚠️</div>
              <p>Are you sure you want to remove <strong>"{course.title}"</strong>?</p>
              <p className={styles.warningText}>This action cannot be undone and all your progress will be lost.</p>
            </div>
            
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancelRemove}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.confirmButton}
                onClick={handleConfirmRemove}
              >
                Remove Course
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Separate component for the card content to avoid duplication
const CourseCardContent: FC<{
  course: Course;
  onRemove?: (courseId: string) => void;
  progress: number;
  totalModules: number;
  completed: number;
  subtitle: string;
  getCourseIcon: () => string;
  onRemoveClick: (e: React.MouseEvent) => void;
}> = ({ course, onRemove, progress, totalModules, completed, subtitle, getCourseIcon, onRemoveClick }) => {
  return (
    <div className={styles.courseCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>{getCourseIcon()}</div>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{course.title}</h3>
          <p className={styles.cardSubtitle}>{subtitle}</p>
        </div>
        <div className={styles.cardDate}>
          {new Date(course.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.progressSection}>
          <ProgressBar 
            value={progress} 
            label={`${completed}/${totalModules} modules completed`}
            className={styles.progressBar}
          />
          <div className={styles.progressStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{totalModules}</span>
              <span className={styles.statLabel}>Modules</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{course.quiz.length}</span>
              <span className={styles.statLabel}>Quiz</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{course.flashcards.length}</span>
              <span className={styles.statLabel}>Cards</span>
            </div>
          </div>
        </div>

        <div className={styles.cardActions}>
          <Link href={`/course/${course.id}`} className={styles.continueButton}>
            {progress === 100 ? "Review Course" : "Continue Learning"}
            <span className={styles.buttonIcon}>→</span>
          </Link>
          
          {onRemove && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={onRemoveClick}
              title="Remove course"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* Status Badge */}
      {progress === 100 && (
        <div className={styles.completedBadge}>
          <span className={styles.badgeIcon}>🎉</span>
          Completed
        </div>
      )}
    </div>
  );
};

export default CourseCard;