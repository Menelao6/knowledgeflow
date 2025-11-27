import type { FC } from "react";
import Link from "next/link";
import type { Category } from "../../lib/data/categories";
import Card from "../common/Card";
import styles from "./CategoryCard.module.css";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className={styles.categoryCardWrapper}>
      <Card
        title={category.name}
        subtitle={category.description}
        headerRight={
          <span className={styles.aiBadge}>
            AI topics
          </span>
        }
      >
        <div className={styles.cardContent}>
          <Link href={`/category/${category.slug}`} className={styles.viewButton}>
            View Topics
            <span className={styles.buttonIcon}>→</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default CategoryCard;