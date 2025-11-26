"use client";

import { useState } from "react";
import Heading from "../ui/Heading";
import SectionWrapper from "../ui/SectionWrapper";
import styles from "./FAQSection.module.css";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  faqs: FAQ[];
}

const FAQSection: React.FC<FAQSectionProps> = ({
  kicker = "Questions?",
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about LearnMate",
  faqs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <SectionWrapper bgColor="white" padding="lg">
      <div className="mb-16">
        <Heading
          level={2}
          kicker={kicker}
          align="center"
          subtitle={subtitle}
        >
          {title}
        </Heading>
      </div>

      <div className={styles.faqContainer}>
        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`${styles.faqItem} ${styles[`faqItem${idx}`]}`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(idx)}
                className={styles.faqQuestion}
              >
                <span>{faq.question}</span>
                <span
                  className={`${styles.faqIcon} ${
                    openIndex === idx ? styles.faqIconOpen : ""
                  }`}
                >
                  +
                </span>
              </button>

              {/* Accordion Content */}
              <div
                className={`${styles.faqAnswer} ${
                  openIndex === idx ? styles.faqAnswerOpen : ""
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FAQSection;