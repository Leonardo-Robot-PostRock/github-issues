import { FC } from 'react';
import { State } from '../interfaces/issues.interface';
import { FiList, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

interface Props {
    state: State;
    onStateChange: (state: State) => void;
}

export const IssueFilters: FC<Props> = ({ state, onStateChange }) => {
    const filterButtons = [
        { state: State.All, label: 'All Issues', icon: FiList, color: 'from-blue-500 to-blue-600' },
        { state: State.Open, label: 'Open', icon: FiAlertCircle, color: 'from-red-500 to-red-600' },
        { state: State.Close, label: 'Closed', icon: FiCheckCircle, color: 'from-green-500 to-green-600' },
    ];

    return (
        <div className="">
            {/* Header */}
            <div className="mb-2 p-2">
                <p className="text-gray-400">Browse and manage issues across repositories</p>
            </div>
            <div className="flex flex-wrap gap-3 p-2">
                {filterButtons.map(({ state: filterState, label, icon: Icon, color }) => (
                    <button
                        key={filterState}
                        onClick={() => onStateChange(filterState)}
                        className={`relative px-3 sm:px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm ${state === filterState
                                ? `bg-gradient-to-r ${color} shadow-lg shadow-blue-500/50`
                                : 'bg-slate-800 hover:bg-slate-700'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Icon size={18} />
                            <span>{label}</span>
                        </div>
                        {state === filterState && (
                            <div className="absolute inset-0 rounded-lg bg-white/10 border border-white/20"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
