import { FC } from 'react';
import { GithubIssue } from '../interfaces/issues.interface';
import { IssueItem } from './IssueItem';

interface Props {
  issues: GithubIssue[];
  perPage?: number;
  containerRef?: React.RefObject<HTMLDivElement>;
  footer?: React.ReactNode;
  infiniteEnabled?: boolean;
}

export const IssueList: FC<Props> = ({ issues, perPage = 5, containerRef, footer, infiniteEnabled = false }) => {

  // enable scroll when infinite mode is active, when configured `perPage` exceeds
  // the compact threshold, or when the actual number of items exceeds `perPage`.
  // This keeps behaviour consistent when `perPage` or infinite mode changes.
  const enableScroll = infiniteEnabled || perPage > 5 || issues.length > perPage;
  const containerCls = `max-w-4xl mx-auto ${enableScroll ? 'max-h-[60vh] overflow-y-auto pr-2 modern-scrollbar' : ''}`;

  return (
    <div className={containerCls} ref={containerRef}>
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

      {/* Footer (loader, etc) rendered inside scroll container) */}
      {footer && (
        <div className="mt-4 flex justify-center">{footer}</div>
      )}
    </div>
  );
};
