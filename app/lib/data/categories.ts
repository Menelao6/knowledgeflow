export type Category = {
  slug: string;
  name: string;
  description: string;
  category?: string;
};

export const categories: Category[] = [
  {
    slug: "technology",
    name: "Technology",
    description: "Python, React, data, and more.",
    category: "Technology",
  },
  {
    slug: "math",
    name: "Math",
    description: "Algebra, calculus, statistics.",
    category: "Mathematics",
  },
  {
    slug: "science",
    name: "Science",
    description: "Biology, physics, chemistry.",
    category: "Science",
  },
  {
    slug: "languages",
    name: "Languages",
    description: "English, Spanish, and more coming soon.",
    category: "Languages",
  },
  {
    slug: "exam-prep",
    name: "Exam Prep",
    description: "Prepare for exams with focused mini-courses.",
    category: "Exam Preparation",
  },
];
