"use client";

import type { FC } from "react";
import { useState } from "react";
import type { Course, Module } from "../../lib/models/course";
import Tabs from "../common/Tabs";
import ModuleList from "./ModuleList";
import LessonViewer from "./LessonViewer";
import FlashcardViewer from "./FlashcardViewer";
import QuizRunner from "./QuizRunner";

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
    <div className="course-tabs">
      <Tabs tabs={tabs} activeId={activeTab} onChange={handleTabChange} />
      <div className="course-content">
        {activeTab === "overview" && (
          <div>
            {course.description && (
              <p
                style={{
                  marginTop: 0,
                  marginBottom: "0.9rem",
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
                }}
              >
                {course.description}
              </p>
            )}
            <ModuleList modules={course.modules} onStartModule={handleStartModule} />
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
