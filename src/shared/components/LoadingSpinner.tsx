import { FiRefreshCcw } from 'react-icons/fi'

interface Props {
    text?: string
}

export const LoadingSpinner = ({ text }: Props) => {
    return (
        <div className="flex justify-center items-center h-52">
            <div className="text-center">
                <FiRefreshCcw className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" size={40} />
                <p className="text-gray-600 font-medium">{text ?? "Loading..."}</p>
            </div>
        </div>
    )
}
