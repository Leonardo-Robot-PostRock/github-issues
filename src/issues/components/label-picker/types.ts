export interface LabelOption {
  value: string;
  label: string;
  color: string;
}

export interface LabelPickerProps {
  selectedLabels: string[];
  onLabelSelected: (labels: string[]) => void;
}