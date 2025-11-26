import type { FC, ReactNode } from "react";
import Heading from "../ui/Heading";
import SectionWrapper from "../ui/SectionWrapper";
import styles from "./StepsSection.module.css";

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: ReactNode;
}

interface StepsSectionProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  steps: Step[];
}

const StepsSection: FC<StepsSectionProps> = ({
  kicker = "Simple Process",
  title = "How It Works in 4 Easy Steps",
  subtitle = "Get started in minutes, not hours",
  steps,
}) => {
  return (
    <SectionWrapper bgColor="white" padding="lg">
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

      <div className={styles.stepsGrid}>
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`${styles.stepItem} ${styles[`stepCard${idx}`]}`}
          >
            {idx < steps.length - 1 && (
              <div className={styles.stepConnector} />
            )}
            
            <div className={styles.stepNumber}>
              {step.number}
            </div>

            <div className={styles.stepContent}>
              {step.icon && (
                <div className={styles.stepIcon}>
                  {step.icon}
                </div>
              )}
              <h3 className={styles.stepTitle}>
                {step.title}
              </h3>
              <p className={styles.stepDescription}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default StepsSection;