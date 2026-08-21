import { cn } from "@/lib/cn";
import { styles } from "./styles";

interface ProgressBarProps {
  value: number;
  total?: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, total, className }) => {
  const percent =
    total && total > 0 ? Math.round((value / total) * 100) : Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(styles.track, className)}
    >
      <div className={cn(styles.fill, percent === 100 && styles.fillComplete)} style={{ width: `${percent}%` }} />
    </div>
  );
};

export default ProgressBar;
