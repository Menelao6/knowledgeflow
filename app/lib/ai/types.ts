export type GeneratedCourseShape = {
  title: string;
  description?: string;
  modules: {
    title: string;
    summary: string;
    learningOutcomes: string[];
    content: string;
  }[];
  flashcards: {
    front: string;
    back: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }[];
};
