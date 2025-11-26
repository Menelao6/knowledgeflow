import type { FC } from "react";
import Link from "next/link";
import type { Course } from "../../lib/models/course";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";

type CourseCardProps = {
  course: Course;
};

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const totalModules = course.modules.length || 1;
  const completed = course.progress.completedModuleIds.length;
  const progress = Math.round((completed / totalModules) * 100);

  const subtitleParts = [];
  if (course.source === "notes") subtitleParts.push("From your notes");
  if (course.category) subtitleParts.push(course.category);
  const subtitle = subtitleParts.join(" • ") || "AI-generated mini course";

  return (
    <Card
      title={course.title}
      subtitle={subtitle}
      headerRight={
        <span
          style={{
            fontSize: "0.78rem",
            color: "var(--color-text-muted)",
          }}
        >
          {new Date(course.createdAt).toLocaleDateString()}
        </span>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <ProgressBar value={progress} label={`${progress}% complete`} />
        <Link href={`/course/${course.id}`} className="btn btn-primary">
          Continue
        </Link>
      </div>
    </Card>
  );
};

export default CourseCard;
