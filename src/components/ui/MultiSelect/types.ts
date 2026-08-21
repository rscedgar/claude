export interface MultiSelectOption {
  value: string;
  label: string;
  count?: number;
  color?: string;
}

export interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}

export interface Styles {
  root: string;
  label: string;
  trigger: string;
  triggerOpen: string;
  placeholder: string;
  summary: string;
  chip: string;
  chipRemove: string;
  chevron: string;
  chevronOpen: string;
  panel: string;
  searchWrap: string;
  search: string;
  clearAll: string;
  list: string;
  option: string;
  optionSelected: string;
  optionLabel: string;
  dot: string;
  checkIcon: string;
  countBadge: string;
  empty: string;
}
