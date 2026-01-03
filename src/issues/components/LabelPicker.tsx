import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../actions/get-labels-action";

export const LabelPicker = () => {

  const labelsQuery = useQuery({
    queryKey: ['react', 'labels'],
    queryFn: getLabels
  })

  if (labelsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando etiquetas...</p>
        </div>
      </div>
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
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
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
