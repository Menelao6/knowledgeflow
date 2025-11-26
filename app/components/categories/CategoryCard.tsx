import type { FC } from "react";
import Link from "next/link";
import type { Category } from "../../lib/data/categories";
import Card from "../common/Card";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <Card
      title={category.name}
      subtitle={category.description}
      headerRight={
        <span
          style={{
            fontSize: "0.78rem",
            padding: "0.1rem 0.5rem",
            borderRadius: "999px",
            backgroundColor: "var(--color-primary-soft)",
            color: "var(--color-primary)",
          }}
        >
          AI topics
        </span>
      }
    >
      <div style={{ marginTop: "0.5rem" }}>
        <Link href={`/category/${category.slug}`} className="btn btn-secondary">
          View topics
        </Link>
      </div>
    </Card>
  );
};

export default CategoryCard;
