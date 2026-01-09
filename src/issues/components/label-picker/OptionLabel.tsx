import { LabelOption } from "./types";

export const OptionLabel = ({ label, color }: Pick<LabelOption, "label" | "color">) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div
      style={{
        width: 12,
        height: 12,
        backgroundColor: `#${color}`,
        borderRadius: "50%"
      }}
    />
    <span>{label}</span>
  </div>
);