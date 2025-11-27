"use client";

import type { FC } from "react";
import { useState } from "react";
import type { Flashcard } from "../../lib/models/course";
import styles from "./FlashcardViewer.module.css";

type FlashcardViewerProps = {
  flashcards: Flashcard[];
};

const FlashcardViewer: FC<FlashcardViewerProps> = ({ flashcards }) => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards.length) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🎴</div>
        <h3>No Flashcards Yet</h3>
        <p>Flashcards will be generated when you create your course.</p>
      </div>
    );
  }

  const card = flashcards[index];
  const progress = ((index + 1) / flashcards.length) * 100;

  function handlePrev() {
    setIsFlipped(false);
    setIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  }

  function handleNext() {
    setIsFlipped(false);
    setIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1));
  }

  function handleFlip() {
    setIsFlipped((prev) => !prev);
  }

  return (
    <div className={styles.flashcardViewer}>
      {/* Progress */}
      <div className={styles.progress}>
        <div className={styles.progressInfo}>
          <span>Card {index + 1} of {flashcards.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className={styles.flashcardContainer}>
        <div 
          className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
          onClick={handleFlip}
        >
          <div className={styles.flashcardFront}>
            <div className={styles.flashcardContent}>
              <div className={styles.cardLabel}>Question</div>
              <p>{card.front}</p>
            </div>
            <div className={styles.flipHint}>Click to reveal answer</div>
          </div>
          <div className={styles.flashcardBack}>
            <div className={styles.flashcardContent}>
              <div className={styles.cardLabel}>Answer</div>
              <p>{card.back}</p>
            </div>
            <div className={styles.flipHint}>Click to see question</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navButton}
          onClick={handlePrev}
        >
          ← Previous
        </button>
        
        <button
          type="button"
          className={styles.flipButton}
          onClick={handleFlip}
        >
          {isFlipped ? "Show Question" : "Show Answer"}
        </button>
        
        <button
          type="button"
          className={styles.navButton}
          onClick={handleNext}
        >
          Next →
        </button>
      </div>

      {/* Study Tip */}
      <div className={styles.studyTip}>
        <div className={styles.tipIcon}>💡</div>
        <p>Practice regularly to move cards from "hard" to "easy" using spaced repetition.</p>
      </div>
    </div>
  );
};

export default FlashcardViewer;