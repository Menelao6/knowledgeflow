import { Course } from "../models/course";

const STORAGE_KEY = "learnmate.courses.v1";

function safeParse<T>(value: string | null, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function getCourses(): Course[] {
  if (typeof window === "undefined") return [];
  return safeParse<Course[]>(localStorage.getItem(STORAGE_KEY), []);
}

export function saveCourses(courses: Course[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

export function upsertCourse(course: Course): void {
  const courses = getCourses();
  const index = courses.findIndex((c) => c.id === course.id);
  if (index === -1) {
    courses.push(course);
  } else {
    courses[index] = course;
  }
  saveCourses(courses);
}

export function getCourseById(id: string): Course | undefined {
  return getCourses().find((c) => c.id === id);
}

// Add this function for removing courses
export function removeCourse(courseId: string): void {
  try {
    const courses = getCourses();
    const updatedCourses = courses.filter(course => course.id !== courseId);
    saveCourses(updatedCourses);
  } catch (error) {
    console.error('Error removing course:', error);
    throw new Error('Failed to remove course');
  }
}

// Optional: Add this function if you need to get all courses (alias for getCourses)
export function getAllCourses(): Course[] {
  return getCourses();
}