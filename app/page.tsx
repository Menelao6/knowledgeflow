// app/page.tsx (updated)
import Link from "next/link";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import StepsSection from "./components/sections/StepsSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import FAQSection from "./components/sections/FAQSection";
import CTASection from "./components/sections/CTASection";

export default function HomePage() {
  // Feature data
  const features = [
    {
      icon: "📝",
      title: "Transform Your Notes",
      description:
        "Paste class notes and watch our AI instantly structure them into organized modules with clear learning outcomes.",
      accent: "primary" as const,
    },
    {
      icon: "🎓",
      title: "Multi-Format Learning",
      description:
        "Get interactive modules, auto-generated quizzes, spaced-repetition flashcards, and summaries all in one place.",
      accent: "accent" as const,
    },
    {
      icon: "⚡",
      title: "Learn at Your Pace",
      description:
        "AI adapts the difficulty and pacing based on your progress. No rush, no pressure—just your perfect learning speed.",
      accent: "primary" as const,
    },
    {
      icon: "📊",
      title: "Track Progress",
      description:
        "See real-time insights into what you've mastered and where you need more practice with detailed analytics.",
      accent: "accent" as const,
    },
    {
      icon: "🔄",
      title: "Instant Feedback",
      description:
        "Get immediate explanations on quiz answers and AI-powered hints when you're stuck on a concept.",
      accent: "primary" as const,
    },
    {
      icon: "🌐",
      title: "Any Topic, Any Subject",
      description:
        "Math, science, programming, languages—pick any subject and get a personalized course in seconds.",
      accent: "accent" as const,
    },
  ];

  // Steps data
  const steps = [
    {
      number: 1,
      icon: "📤",
      title: "Upload or Browse",
      description:
        "Paste your notes directly or pick a pre-built course from our library of topics.",
    },
    {
      number: 2,
      icon: "✨",
      title: "AI Generates Course",
      description:
        "Our AI instantly creates structured modules, quizzes, and flashcards tailored to your content.",
    },
    {
      number: 3,
      icon: "📚",
      title: "Learn Interactively",
      description:
        "Study with modules, test your knowledge with quizzes, and reinforce learning with flashcards.",
    },
    {
      number: 4,
      icon: "🎯",
      title: "Master & Track",
      description:
        "Monitor your progress and get personalized recommendations for topics that need more work.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote:
        "I used to spend hours organizing my notes. Knowledge Flow AI did it in seconds. I'm studying 3x more effectively now.",
      author: "Sarah Chen",
      role: "College Student",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      quote:
        "The adaptive quizzes are a game-changer. They know exactly what I struggle with and focus on those areas.",
      author: "Marcus Johnson",
      role: "High School Learner",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    {
      quote:
        "Finally, a tool that turns messy class notes into real learning material. Highly recommend!",
      author: "Elena Rodriguez",
      role: "Competitive Exam Prep",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "Do I need to create an account?",
      answer:
        "Nope! This demo stores everything in your browser—no sign-ups, no tracking. For the full version, you can optionally create an account to sync across devices.",
    },
    {
      question: "How long does it take to generate a course?",
      answer:
        "Most courses are generated in 10-30 seconds, depending on the content length. You get instant feedback and can start learning immediately.",
    },
    {
      question: "Can I use my own notes?",
      answer:
        "Absolutely! Paste any text, upload documents, or paste links. Our AI will intelligently structure and turn it into a full course with modules, quizzes, and flashcards.",
    },
    {
      question: "What topics are available?",
      answer:
        "You can create a course on virtually any topic—math, science, languages, programming, history, and more. Upload your own notes or pick from pre-built courses.",
    },
    {
      question: "Is my data private?",
      answer:
        "Yes! In this demo, everything stays on your device. For the production version, we use end-to-end encryption and never sell your data.",
    },
    {
      question: "Can I download or export my courses?",
      answer:
        "You can print quizzes and export flashcards as PDFs or CSV files. Full export features are coming soon.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection
        kicker="Why Knowledge Flow"
        title="Powerful Features Built for Learning"
        subtitle="Transform the way you study with AI-powered personalization and adaptive learning"
        features={features}
      />

      {/* Steps Section */}
      <StepsSection
        kicker="Simple Process"
        title="How It Works in 4 Easy Steps"
        subtitle="Get started in minutes, not hours"
        steps={steps}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        kicker="Loved by Learners"
        title="What Our Users Say"
        subtitle="Join thousands of students transforming their learning with AI"
        testimonials={testimonials}
      />

      {/* FAQ Section */}
      <FAQSection
        kicker="Questions?"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Knowledge Flow"
        faqs={faqs}
      />

      {/* Final CTA Section */}
      <CTASection
        title="Ready to Transform Your Learning?"
        subtitle="Join thousands of students learning smarter, not harder. Start for free—no credit card required."
        primaryCTA={{ label: "Get Started Now", href: "/upload" }}
        secondaryCTA={{ label: "Explore Courses", href: "/dashboard" }}
      />

      {/* Footer */}
      <Footer
        brandName="Knowledge Flow"
        tagline="AI-powered personalized learning for everyone"
        sections={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#steps" },
              { label: "Pricing", href: "#pricing" },
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
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Contact", href: "/contact" },
            ],
          },
        ]}
      />
    </>
  );
}