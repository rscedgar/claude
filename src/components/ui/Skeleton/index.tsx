import { cn } from "@/lib/cn";
import { styles } from "./styles";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div aria-hidden className={cn(styles.root, className)} />
);

export default Skeleton;
