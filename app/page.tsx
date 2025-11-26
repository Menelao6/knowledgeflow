// app/page.tsx
import Link from "next/link";
import Navbar from "./components/layout/navbar";
import PageContainer from "./components/layout/PageContainer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <PageContainer>
        <section className="hero">
          <div className="hero-text">
            <div className="hero-kicker">
              <span>✨ AI-powered study companion</span>
            </div>
            <h1>Turn Notes & Topics Into Personalized AI Courses</h1>
            <p>
              Upload your notes or pick a topic like Python or Algebra and let
              LearnMate AI transform it into modules, quizzes, and flashcards
              tailored to your learning pace.
            </p>
            <div className="hero-actions">
              <Link href="/upload" className="btn btn-primary">
                Upload Your Notes
              </Link>
              <Link href="/dashboard" className="btn btn-secondary">
                Explore Courses
              </Link>
            </div>
            <p className="text-muted" style={{ fontSize: "0.85rem" }}>
              No accounts, no stress — everything stays in your browser for this
              demo.
            </p>
          </div>
          <div className="hero-preview">
            <div className="preview-card">
              <span className="preview-card-strong">Mini-course from notes</span>
              <br />
              Paste class notes and get 3–6 structured modules with clear
              learning outcomes.
            </div>
            <div className="preview-card">
              <span className="preview-card-strong">
                Tech, Math, Science & more
              </span>
              <br />
              Start quickly with AI-generated courses by category and topic.
            </div>
            <div className="preview-card">
              <span className="preview-card-strong">
                Flashcards & quizzes
              </span>
              <br />
              Practice with automatically generated questions and key concept
              flashcards.
            </div>
          </div>
        </section>
      </PageContainer>
    </>
  );
}
