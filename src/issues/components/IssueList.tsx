import { FC } from 'react';
import { GithubIssue, State } from '../interfaces/issues.interface';
import { IssueItem } from './IssueItem';
import { FiList, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

interface Props {
  issues: GithubIssue[];
  onStateChange: (state: State) => void;
  state: State;
}

export const IssueList: FC<Props> = ({ issues, onStateChange, state }) => {
  const filterButtons = [
    { state: State.All, label: 'All Issues', icon: FiList, color: 'from-blue-500 to-blue-600' },
    { state: State.Open, label: 'Open', icon: FiAlertCircle, color: 'from-red-500 to-red-600' },
    { state: State.Close, label: 'Closed', icon: FiCheckCircle, color: 'from-green-500 to-green-600' },
  ];

  return (
    <div className="p-2">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-400">Browse and manage issues across repositories</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8">
          {filterButtons.map(({ state: filterState, label, icon: Icon, color }) => (
            <button
              key={filterState}
              onClick={() => onStateChange(filterState)}
              className={`relative px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 text-sm ${
                state === filterState
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

        {/* Issues Count */}
        <div className="mb-6 text-sm text-gray-400">
          Showing <span className="font-semibold text-white">{issues.length}</span> issue{issues.length !== 1 ? 's' : ''}
        </div>

        {/* Issues List */}
        <div className="space-y-3">
          {issues.length > 0 ? (
            issues.map((issue) => (
              <IssueItem key={issue.id} issue={issue} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No issues found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
