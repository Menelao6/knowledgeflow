"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/layout/navbar";
import PageContainer from "../components/layout/PageContainer";
import type { Course } from "../lib/models/course";
import { getCourses } from "../lib/storage/courseStorage";
import { categories } from "../lib/data/categories";
import CourseCard from "../components/courses/CourseCard";
import CategoryCard from "../components/categories/CategoryCard";

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  return (
    <>
      <Navbar />
      <PageContainer>
        <section className="section">
          <h2>My Courses</h2>
          <p>
            These courses were generated from your notes or selected topics.
            Everything is stored locally in your browser.
          </p>
          {courses.length === 0 ? (
            <p className="text-muted">
              No courses yet. Try creating one from your{" "}
              <a href="/upload">notes</a> or explore a topic below.
            </p>
          ) : (
            <div className="grid-cards">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <h2>Explore by Category</h2>
          <p>Let the AI build a mini-course from a broad subject or topic.</p>
          <div className="grid-cards">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </section>
      </PageContainer>
    </>
  );
}
