import type { FC } from "react";

type ProgressBarProps = {
  value: number; // 0–100
  label?: string;
};

const ProgressBar: FC<ProgressBarProps> = ({ value, label }) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="progress">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
