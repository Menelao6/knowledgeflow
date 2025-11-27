// app/components/sections/HeroSection.tsx
import Link from "next/link";
import HeroBackground from "./HeroBackground"; // or HeroBackgroundCSS for lighter version
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={`page-container ${styles.heroContainer}`}>
      {/* Background Animation */}
      <div className={styles.heroBackground}>
        <HeroBackground />
      </div>
      
      {/* Content */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.heroKicker}>
            <span>✨ AI-powered study companion</span>
          </div>
          <h1 className={styles.title}>Turn Notes & Topics Into Personalized AI Courses</h1>
          <p className={styles.subtitle}>
            Upload your notes or pick a topic like Python or Algebra and let
            Knowledge Flow AI transform it into modules, quizzes, and flashcards
            tailored to your learning pace.
          </p>
          <div className={styles.heroActions}>
            <Link href="/upload" className="btn btn-primary">
              Upload Your Notes
            </Link>
            <Link href="/dashboard" className="btn btn-secondary">
              Explore Courses
            </Link>
          </div>
          <p className={styles.textMuted}>
            No accounts, no stress — everything stays in your browser for this
            demo.
          </p>
        </div>
        
        <div className={styles.heroPreview}>
          <div className={`${styles.previewCard} ${styles.previewCard1}`}>
            <span className={styles.previewCardStrong}>Mini-course from notes</span>
            <br />
            Paste class notes and get 3–6 structured modules with clear
            learning outcomes.
          </div>
          <div className={`${styles.previewCard} ${styles.previewCard2}`}>
            <span className={styles.previewCardStrong}>
              Tech, Math, Science & more
            </span>
            <br />
            Start quickly with AI-generated courses by category and topic.
          </div>
          <div className={`${styles.previewCard} ${styles.previewCard3}`}>
            <span className={styles.previewCardStrong}>
              Flashcards & quizzes
            </span>
            <br />
            Practice with automatically generated questions and key concept
            flashcards.
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;