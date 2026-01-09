import Select from "react-select";
import { LoadingSpinner } from "../../shared";
import { useLabels } from "../hooks/useLabels";
import { customStyles } from "./styles";
import { OptionLabel } from "./OptionLabel";
import { LabelOption, LabelPickerProps as Props } from "./types";

const CSS_CLASSES = {
  container: "w-full",
  wrapper: "p-3 sm:p-2",
  title: "text-xs sm:text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide",
  emptyMessage: "text-sm text-gray-500 text-center py-4"
};

export const LabelPicker = ({ onLabelSelected, selectedLabels }: Props) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <LoadingSpinner text="Cargando etiquetas..." />;
  }

  const labelOptions: LabelOption[] =
    labelsQuery.data?.map(label => ({
      value: label.name,
      label: label.name,
      color: label.color
    })) ?? [];

  const selectedOptions = labelOptions.filter(opt => selectedLabels.includes(opt.value));

  return (
    <div className={CSS_CLASSES.container}>
      <div className={CSS_CLASSES.wrapper}>
        <h3 className={CSS_CLASSES.title}>Filtrar por etiqueta</h3>
        {labelOptions.length > 0 ? (
          <Select<LabelOption, true>
            options={labelOptions}
            value={selectedOptions}
            onChange={(options) => onLabelSelected(options?.map(opt => opt.value) ?? [])}
            styles={customStyles}
            formatOptionLabel={(opt) => <OptionLabel label={opt.label} color={opt.color} />}
            isSearchable
            isClearable
            isMulti
            menuPosition="fixed"
            placeholder="Selecciona etiquetas..."
          />
        ) : (
          <p className={CSS_CLASSES.emptyMessage}>No hay etiquetas disponibles</p>
        )}
      </div>
    </div>
  );
};
