import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GithubIssue, State } from '../interfaces/issues.interface';
import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  issue: GithubIssue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const presetData = () => {
    queryClient.setQueryData(['issues', issue.number], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
  };

  return (
    <div
      onMouseEnter={presetData}
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      className="animate-fadeIn group relative px-4 py-4 mb-4 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 border border-slate-600 hover:border-slate-500 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-slate-900/50 hover:-translate-y-1"
    >
      <div className="flex items-center gap-4">
        {/* Status Icon */}
        <div className="flex-shrink-0">
          {issue.state === State.Open ? (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-900/30 border border-red-500/50">
              <FiInfo size={20} color="#ef4444" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-900/30 border border-green-500/50">
              <FiCheckCircle size={20} color="#22c55e" />
            </div>
          )}
        </div>

        {/* Issue Info */}
        <div className="flex-grow">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-grow">
              <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors line-clamp-2">
                {issue.title}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
                <span className="font-mono">#{issue.number}</span>
                <span>•</span>
                <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>by <span className="text-gray-300 font-semibold">{issue.user.login}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* User Avatar */}
        <div className="flex-shrink-0">
          <img
            src={issue.user.avatar_url}
            alt={issue.user.login}
            className="w-10 h-10 rounded-full border border-slate-500 group-hover:border-slate-400 transition-colors"
          />
        </div>

        {/* Comments Count */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1 px-3">
          <FiMessageSquare size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
          <span className="text-sm text-gray-400 group-hover:text-gray-300 font-semibold transition-colors">{issue.comments}</span>
        </div>
      </div>
    </div>
  );
};
