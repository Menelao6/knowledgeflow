export type CourseSource = "notes" | "category";

export type Flashcard = {
  id: string;
  front: string;
  back: string;
  isHard?: boolean;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
};

export type Module = {
  id: string;
  title: string;
  summary: string;
  learningOutcomes: string[];
  content: string; // full lesson text
};

export type CourseProgress = {
  completedModuleIds: string[];
  lastVisitedModuleId?: string;
};

export type Course = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  source: CourseSource;
  createdAt: string;
  modules: Module[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  progress: CourseProgress;
};
