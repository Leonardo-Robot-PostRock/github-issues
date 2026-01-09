import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GithubIssue, State } from '../interfaces/issues.interface';
import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { timeSince } from '../../helpers';

interface Props {
  issue: GithubIssue;
}

const CSS_CLASSES = {
  container: "animate-fadeIn group relative px-4 py-4 mb-4 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 border border-slate-600 hover:border-slate-500 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-slate-900/50 hover:-translate-y-1",
  flexContainer: "flex flex-col sm:flex-row items-start sm:items-center gap-4",
  statusIcon: {
    container: "flex-shrink-0",
    open: "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-900/30 border border-red-500/50",
    closed: "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-900/30 border border-green-500/50"
  },
  issueInfo: {
    container: "flex-grow w-full",
    header: "flex items-start justify-between gap-4",
    content: "flex-grow",
    title: "text-white font-semibold group-hover:text-blue-400 transition-colors line-clamp-2",
    meta: "mt-2 flex items-center gap-3 text-sm text-gray-400"
  },
  avatar: "w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-500 group-hover:border-slate-400 transition-colors",
  comments: {
    container: "flex-shrink-0 flex flex-row sm:flex-col items-center gap-1 px-3",
    text: "text-sm text-gray-400 group-hover:text-gray-300 font-semibold transition-colors"
  }
};

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
      className={CSS_CLASSES.container}
    >
      <div className={CSS_CLASSES.flexContainer}>
        {/* Status Icon */}
        <div className={CSS_CLASSES.statusIcon.container}>
          {issue.state === State.Open ? (
            <div className={CSS_CLASSES.statusIcon.open}>
              <FiInfo size={20} color="#ef4444" />
            </div>
          ) : (
            <div className={CSS_CLASSES.statusIcon.closed}>
              <FiCheckCircle size={20} color="#22c55e" />
            </div>
          )}
        </div>

        {/* Issue Info */}
        <div className={CSS_CLASSES.issueInfo.container}>
          <div className={CSS_CLASSES.issueInfo.header}>
            <div className={CSS_CLASSES.issueInfo.content}>
              <h3 className={CSS_CLASSES.issueInfo.title}>
                {issue.title}
              </h3>
              <div className={CSS_CLASSES.issueInfo.meta}>
                <span className="font-mono">#{issue.number}</span>
                <span>•</span>
                <span>{timeSince(issue.closed_at)}</span>
                <span>•</span>
                <span>by <span className="text-gray-300 font-semibold">{issue.user.login}</span></span>

              </div>
              <div className='flex flex-wrap mt-2'>
                {issue.labels.map(label => (
                  <span
                    className='rounded-md text-white px-2 py-1 text-xs mr-2 mb-2'
                    key={label.id}
                    style={{
                      border: `1px solid #${label.color}`,
                      display: 'inline-block'
                    }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Avatar */}
        <div className="flex-shrink-0">
          <img
            src={issue.user.avatar_url}
            alt={issue.user.login}
            className={CSS_CLASSES.avatar}
          />
        </div>

        {/* Comments Count */}
        <div className={CSS_CLASSES.comments.container}>
          <FiMessageSquare size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
          <span className={CSS_CLASSES.comments.text}>{issue.comments}</span>
        </div>
      </div>
    </div>
  );
};
