import Select from "react-select";

import { customStyles } from "./styles";
import { OptionLabel } from "./OptionLabel";
import { LabelOption, LabelPickerProps as Props } from "./types";
import { useLabels } from "../../hooks/useLabels";

const CSS_CLASSES = {
  container: "w-full",
  wrapper: "p-2 sm:p-4",
  title: "text-xs sm:text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide",
  emptyMessage: "text-sm text-gray-500 text-center py-4"
};

export const LabelPicker = ({ onLabelSelected, selectedLabels }: Props) => {
  const { labelsQuery } = useLabels();

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
          isLoading={labelsQuery.isLoading}
          isDisabled={labelsQuery.isLoading}
          noOptionsMessage={() => labelsQuery.isLoading ? 'Cargando etiquetas...' : 'No hay etiquetas disponibles'}
          placeholder={labelsQuery.isLoading ? 'Cargando etiquetas...' : 'Selecciona etiquetas...'}
        />
      </div>
    </div>
  );
};
