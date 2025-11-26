"use client";

import type { FC } from "react";
import { useState } from "react";
import type { Flashcard } from "../../lib/models/course";

type FlashcardViewerProps = {
  flashcards: Flashcard[];
};

const FlashcardViewer: FC<FlashcardViewerProps> = ({ flashcards }) => {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  if (!flashcards.length) {
    return <p className="text-muted">No flashcards generated for this course.</p>;
  }

  const card = flashcards[index];

  function handlePrev() {
    setShowBack(false);
    setIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  }

  function handleNext() {
    setShowBack(false);
    setIndex((prev) => (prev === flashcards.length - 1 ? 0 : prev + 1));
  }

  function handleFlip() {
    setShowBack((prev) => !prev);
  }

  return (
    <div className="flashcard-shell">
      <div className="flashcard-box">
        <div className="flashcard-label">
          Card {index + 1} of {flashcards.length}
        </div>
        <div className="flashcard-front">
          <strong>Q:</strong> {card.front}
        </div>
        {showBack && (
          <div className="flashcard-back">
            <strong>A:</strong> {card.back}
          </div>
        )}
      </div>

      <div className="flashcard-controls">
        <div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrev}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleNext}
            style={{ marginLeft: "0.4rem" }}
          >
            Next
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleFlip}
          >
            {showBack ? "Hide answer" : "Show answer"}
          </button>
        </div>
        <div className="flashcard-index">
          Practice regularly to move cards from &quot;hard&quot; to &quot;easy&quot; in the
          future.
        </div>
      </div>
    </div>
  );
};

export default FlashcardViewer;
