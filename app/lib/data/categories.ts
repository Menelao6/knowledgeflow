import { StaticImageData } from "next/image";
import  techIcon from "../../../public/machine-learning.png";
import  mathIcon from "../../../public/math_1411949.png";
import  scienceIcon from "../../../public/atom_2852309.png";
import  languagesIcon from "../../../public/languages_4983962.png";
import  examPrepIcon from "../../../public/examination_18935127.png";

export type Category = {
  slug: string;
  name: string;
  description: string;
  category?: string;
  icon?: StaticImageData;
};

export const categories: Category[] = [
  {
    slug: "technology",
    name: "Technology",
    description: "Python, React, data, and more.",
    category: "Technology",
    icon: techIcon,
  },
  {
    slug: "math",
    name: "Math",
    description: "Algebra, calculus, statistics.",
    category: "Mathematics",
    icon: mathIcon,
  },
  {
    slug: "science",
    name: "Science",
    description: "Biology, physics, chemistry.",
    category: "Science",
    icon: scienceIcon,
  },
  {
    slug: "languages",
    name: "Languages",
    description: "English, Spanish, and more coming soon.",
    category: "Languages",
    icon: languagesIcon,
  },
  {
    slug: "exam-prep",
    name: "Exam Prep",
    description: "Prepare for exams with focused mini-courses.",
    category: "Exam Preparation",
    icon: examPrepIcon,
  },
];