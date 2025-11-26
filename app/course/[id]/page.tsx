"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/layout/navbar";
import PageContainer from "../../components/layout/PageContainer";
import type { Course, Module } from "../../lib/models/course";
import { getCourseById, upsertCourse } from "../../lib/storage/courseStorage";
import CourseTabs from "../../components/courses/CourseTabs";

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (!id) return;
    const found = getCourseById(id);
    if (!found) {
      router.push("/dashboard");
    } else {
      setCourse(found);
    }
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

  if (!course) {
    return (
      <>
        <Navbar />
        <PageContainer>
          <p>Loading course...</p>
        </PageContainer>
      </>
    );
  }

  const totalModules = course.modules.length || 1;
  const completedCount = course.progress.completedModuleIds.length;
  const progress = Math.round((completedCount / totalModules) * 100);

  return (
    <>
      <Navbar />
      <PageContainer>
        <header className="course-header">
          <div>
            <h1>{course.title}</h1>
            {course.category && (
              <p className="course-category text-muted">{course.category}</p>
            )}
          </div>
          <div className="course-progress">
            <span className="course-progress-label">{progress}% complete</span>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <CourseTabs course={course} onModuleCompleted={updateProgress} />
      </PageContainer>
    </>
  );
}
