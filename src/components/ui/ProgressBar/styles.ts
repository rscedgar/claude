export interface ProgressBarStyles {
  track: string;
  fill: string;
  fillComplete: string;
}

const styles: ProgressBarStyles = {
  track: "h-1.5 w-full overflow-hidden rounded-full bg-white/8",
  fill: "h-full rounded-full bg-congress-500 transition-all duration-300",
  fillComplete: "bg-status-done",
};

export { styles };
