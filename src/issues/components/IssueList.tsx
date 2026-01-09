import { FC } from 'react';
import { GithubIssue } from '../interfaces/issues.interface';
import { IssueItem } from './IssueItem';

interface Props {
  issues: GithubIssue[];
}

export const IssueList: FC<Props> = ({ issues }) => {
  return (
      <div className="max-w-4xl mx-auto">

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
  );
};
