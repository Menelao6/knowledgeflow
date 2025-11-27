"use client";

import type { FC } from "react";
import { useState } from "react";
import type { Course, Module } from "../../lib/models/course";
import Tabs from "../common/Tabs";
import ModuleList from "./ModuleList";
import LessonViewer from "./LessonViewer";
import FlashcardViewer from "./FlashcardViewer";
import QuizRunner from "./QuizRunner";
import styles from "./CourseTabs.module.css";

type CourseTabsProps = {
  course: Course;
  onModuleCompleted?: (module: Module) => void;
};

type TabId = "overview" | "lessons" | "flashcards" | "quiz";

const CourseTabs: FC<CourseTabsProps> = ({ course, onModuleCompleted }) => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [activeModule, setActiveModule] = useState<Module | null>(
    course.modules[0] ?? null
  );

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "lessons", label: "Lessons" },
    { id: "flashcards", label: "Flashcards" },
    { id: "quiz", label: "Quiz" },
  ];

  const getTabStats = () => {
    const totalModules = course.modules.length;
    const completedModules = course.progress.completedModuleIds.length;
    const totalFlashcards = course.flashcards.length;
    const totalQuestions = course.quiz.length;

    return {
      overview: `${completedModules}/${totalModules} completed`,
      lessons: `${totalModules} modules`,
      flashcards: `${totalFlashcards} cards`,
      quiz: `${totalQuestions} questions`
    };
  };

  const tabStats = getTabStats();

  function handleTabChange(id: string) {
    setActiveTab(id as TabId);
  }

  function handleStartModule(mod: Module) {
    setActiveModule(mod);
    setActiveTab("lessons");
  }

  function handleSelectModule(mod: Module) {
    setActiveModule(mod);
  }

  return (
    <div className={styles.courseTabs}>
      <div className={styles.tabsHeader}>
        <div className={styles.tabsContainer}>
          <Tabs 
            tabs={tabs.map(tab => ({
              ...tab,
              label: (
                <div className={styles.tabLabel}>
                  <span>{tab.label}</span>
                  <span className={styles.tabStat}>{tabStats[tab.id as keyof typeof tabStats]}</span>
                </div>
              )
            }))} 
            activeId={activeTab} 
            onChange={handleTabChange}
            className={styles.tabs}
          />
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "overview" && (
          <div className={styles.overviewTab}>
            {course.description && (
              <div className={styles.courseDescription}>
                <h3>About This Course</h3>
                <p>{course.description}</p>
              </div>
            )}
            
            <div className={styles.quickStats}>
              <h3>Course Overview</h3>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>📚</div>
                  <div className={styles.statInfo}>
                    <span className={styles.statNumber}>{course.modules.length}</span>
                    <span className={styles.statLabel}>Learning Modules</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>🎴</div>
                  <div className={styles.statInfo}>
                    <span className={styles.statNumber}>{course.flashcards.length}</span>
                    <span className={styles.statLabel}>Flashcards</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>❓</div>
                  <div className={styles.statInfo}>
                    <span className={styles.statNumber}>{course.quiz.length}</span>
                    <span className={styles.statLabel}>Quiz Questions</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>⏱️</div>
                  <div className={styles.statInfo}>
                    <span className={styles.statNumber}>
                      {Math.ceil(course.modules.length * 15)} min
                    </span>
                    <span className={styles.statLabel}>Estimated Time</span>
                  </div>
                </div>
              </div>
            </div>

            <ModuleList 
              modules={course.modules} 
              completedModuleIds={course.progress.completedModuleIds}
              onStartModule={handleStartModule} 
            />
          </div>
        )}

        {activeTab === "lessons" && (
          <LessonViewer
            course={course}
            activeModule={activeModule}
            onSelectModule={handleSelectModule}
            onModuleCompleted={onModuleCompleted}
          />
        )}

        {activeTab === "flashcards" && (
          <FlashcardViewer flashcards={course.flashcards} />
        )}

        {activeTab === "quiz" && <QuizRunner questions={course.quiz} />}
      </div>
    </div>
  );
};

export default CourseTabs;