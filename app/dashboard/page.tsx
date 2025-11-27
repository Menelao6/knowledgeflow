"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";
import PageContainer from "../components/layout/PageContainer";
import type { Course } from "../lib/models/course";
import { getCourses, removeCourse } from "../lib/storage/courseStorage";
import { categories } from "../lib/data/categories";
import CourseCard from "../components/courses/CourseCard";
import CategoryCard from "../components/categories/CategoryCard";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const handleRemoveCourse = (courseId: string) => {
    // Remove from storage
    removeCourse(courseId);
    
    // Update state to remove from UI
    setCourses(prev => prev.filter(course => course.id !== courseId));
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>My Courses</h2>
            <p>
              These courses were generated from your notes or selected topics.
              Everything is stored locally in your browser.
            </p>
          </div>
          
          {courses.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📚</div>
              <h3>No Courses Yet</h3>
              <p>Try creating one from your notes or explore a topic below.</p>
              <div className={styles.emptyActions}>
                <a href="/upload" className="btn btn-primary">
                  Create Course from Notes
                </a>
              </div>
            </div>
          ) : (
            <div className={styles.coursesGrid}>
              {courses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onRemove={handleRemoveCourse}
                />
              ))}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Explore by Category</h2>
            <p>Let the AI build a mini-course from a broad subject or topic.</p>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </section>
      </PageContainer>
    </>
  );
}