import { LoadingSpinner } from "../../shared";
import { useLabels } from "../hooks/useLabels";

export const LabelPicker = () => {

  const { labelsQuery } = useLabels()

  if (labelsQuery.isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <div className="w-full">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">
          Filtrar por etiqueta
        </h3>
        <div className="flex flex-wrap gap-2">
          {
            labelsQuery.data?.map(label => (
              <button
                key={label.id}
                className="animate-fadeIn inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                style={{
                  backgroundColor: `#${label.color}30`,
                  border: `2px solid ${label.color}`,
                  color: `#${label.color}`
                }}
              >
                {label.name}
              </button>
            ))
          }
        </div>
        {labelsQuery.data?.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay etiquetas disponibles
          </p>
        )}
      </div>
    </div>
  );
};
