import type { FC, ReactNode } from "react";
import Heading from "../ui/Heading";
import SectionWrapper from "../ui/SectionWrapper";
import styles from "./TestimonialsSection.module.css";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

const TestimonialsSection: FC<TestimonialsSectionProps> = ({
  kicker = "Loved by Learners",
  title = "What Our Users Say",
  subtitle = "Join thousands of students transforming their learning",
  testimonials,
}) => {
  const renderStars = (rating: number = 5) => {
    return (
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`${styles.star} ${i < rating ? styles.starActive : styles.starInactive}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <SectionWrapper bgColor="primary-soft" padding="lg">
      <div className={styles.kicker}>
        <Heading
          level={2}
          kicker={kicker}
          align="center"
          subtitle={subtitle}
        >
          {title}
        </Heading>
      </div>

      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className={`${styles.testimonialCard} ${styles[`testimonialCard${idx}`]}`}
          >
            <div className={styles.testimonialContent}>
              {/* Stars */}
              {testimonial.rating && renderStars(testimonial.rating)}

              {/* Quote */}
              <p className={styles.quote}>
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className={styles.author}>
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className={styles.avatar}
                  />
                )}
                <div className={styles.authorInfo}>
                  <p className={styles.authorName}>
                    {testimonial.author}
                  </p>
                  <p className={styles.authorRole}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;