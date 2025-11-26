import "./globals.css";
import "./styles/layout.css";
import "./styles/home.css";
import "./styles/upload.css";
import "./styles/dashboard.css";
import "./styles/category.css";
import "./styles/course.css";

import type { ReactNode } from "react";

export const metadata = {
  title: "LearnMate AI",
  description: "Turn notes & topics into personalized AI courses.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
