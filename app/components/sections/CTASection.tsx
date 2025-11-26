import Link from "next/link";
import SectionWrapper from "../ui/SectionWrapper";
import styles from "./CTASection.module.css";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryCTA: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
}) => {
  return (
    <SectionWrapper
      bgColor="white"
      padding="lg"
      className={styles.ctaSection}
    >
      <div className={styles.ctaContent}>
        {/* Decorative gradient line */}
        <div className={styles.decorativeLine} />

        {/* Title */}
        <h2 className={styles.ctaTitle}>
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className={styles.ctaSubtitle}>
            {subtitle}
          </p>
        )}

        {/* CTA Buttons */}
        <div className={styles.ctaActions}>
          <Link href={primaryCTA.href} className="btn btn-primary">
            {primaryCTA.label}
          </Link>
          {secondaryCTA && (
            <Link href={secondaryCTA.href} className="btn btn-secondary">
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CTASection;