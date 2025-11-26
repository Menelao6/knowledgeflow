import type { FC, ReactNode } from "react";

type CardProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  headerRight?: ReactNode;
  children?: ReactNode;
};

const Card: FC<CardProps> = ({ title, subtitle, headerRight, children }) => {
  return (
    <div className="card">
      {(title || subtitle || headerRight) && (
        <div className="card-header">
          <div>
            {title && <div className="card-title">{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      {children && <div className="card-body">{children}</div>}
    </div>
  );
};

export default Card;
