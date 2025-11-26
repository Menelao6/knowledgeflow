import Link from "next/link";
import type { FC } from "react";
import styles from "./Footer.module.css";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  brandName?: string;
  tagline?: string;
  sections?: Array<{
    title: string;
    links: FooterLink[];
  }>;
  socialLinks?: Array<{
    icon: string;
    href: string;
    label: string;
  }>;
  copyrightText?: string;
}

const Footer: FC<FooterProps> = ({
  brandName = "Knowledge Flow",
  tagline = "AI-powered personalized learning for everyone",
  sections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Security", href: "#security" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  socialLinks = [
    { icon: "𝕏", href: "https://twitter.com", label: "Twitter" },
    { icon: "f", href: "https://facebook.com", label: "Facebook" },
    { icon: "in", href: "https://linkedin.com", label: "LinkedIn" },
  ],
  copyrightText = `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`,
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top section */}
        <div className={styles.topSection}>
          {/* Brand info */}
          <div className={styles.brandInfo}>
            <h3 className={styles.brandName}>{brandName}</h3>
            <p className={styles.tagline}>
              {tagline}
            </p>
          </div>

          {/* Links sections */}
          {sections.map((section, idx) => (
            <div key={idx} className={styles.linkSection}>
              <h4 className={styles.sectionTitle}>{section.title}</h4>
              <ul className={styles.linkList}>
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className={styles.link}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className={styles.bottomSection}>
          {/* Copyright */}
          <p className={styles.copyright}>{copyrightText}</p>

          {/* Social links */}
          <div className={styles.socialLinks}>
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                title={social.label}
                className={styles.socialLink}
              >
                <span className={styles.socialIcon}>{social.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;