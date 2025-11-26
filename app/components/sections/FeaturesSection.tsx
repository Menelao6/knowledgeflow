import type { FC, ReactNode } from "react";
import Heading from "../ui/Heading";
import SectionWrapper from "../ui/SectionWrapper";
import styles from "./FeaturesSection.module.css";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  accent?: "primary" | "accent";
}

interface FeaturesSectionProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  features: Feature[];
}

const FeaturesSection: FC<FeaturesSectionProps> = ({
  kicker = "Why Knowledge Flow",
  title = "Powerful Features Built for Learning",
  subtitle = "Transform the way you learn with AI-powered personalization",
  features,
}) => {
  return (
    <SectionWrapper bgColor="light" padding="lg">
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

      <div className={styles.featuresGrid}>
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`${styles.featureCard} ${styles[`featureCard${idx}`]}`}
          >
            <div className={styles.featureIcon}>
              {feature.icon}
            </div>
            <h3 className={styles.featureTitle}>
              {feature.title}
            </h3>
            <p className={styles.featureDescription}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FeaturesSection;