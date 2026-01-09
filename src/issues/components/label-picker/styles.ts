import { StylesConfig, GroupBase } from "react-select";
import { LabelOption } from "./types";

export const customStyles: StylesConfig<LabelOption, true, GroupBase<LabelOption>> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1e293b",
    borderColor: state.isFocused ? "#3b82f6" : "#475569",
    borderWidth: "2px",
    color: "#fff",
    cursor: "pointer",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
    transition: "all 0.3s ease",
    "&:hover": { borderColor: "#64748b" }
  }),
  option: (base, props) => ({
    ...base,
    backgroundColor: props.isFocused ? "#334155" : "#1e293b",
    color: props.isSelected ? `#${props.data.color}` : "#e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: props.isSelected ? 600 : 400,
    padding: "10px 12px"
  }),
  multiValue: (base, props) => ({
    ...base,
    // Subtle gradient that blends the label color with the page slate for good contrast
    backgroundImage: `linear-gradient(260deg, #${props.data.color}EE 0%, rgba(15,23,42,0.85) 100%)`,
    borderRadius: 8,
    padding: "3px 8px",
    minHeight: "28px",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "0.875rem",
    color: "#fff"
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#ffffff",
    fontWeight: 600,
    paddingRight: 6,
    textShadow: "0 1px 0 rgba(0,0,0,0.25)",
    lineHeight: "1"
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#ffffff",
    cursor: "pointer",
    backgroundColor: "transparent",
    borderRadius: 6,
    padding: "4px",
    marginLeft: 6,
    // keyboard focus visible
    "&:focus": {
      outline: "2px solid #3b82f6",
      outlineOffset: "2px"
    },
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.12)",
      color: "#ffffff"
    }
  }),
  singleValue: (base) => ({ ...base, color: "#e2e8f0", fontWeight: 500 }),
  input: (base) => ({ ...base, color: "#e2e8f0" }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e293b",
    border: "2px solid #475569",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
    borderRadius: 8
  }),
  menuList: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
    "&::-webkit-scrollbar": { width: "6px" },
    "&::-webkit-scrollbar-track": { background: "#0f172a" },
    "&::-webkit-scrollbar-thumb": { background: "#475569", borderRadius: "3px" }
  })
};