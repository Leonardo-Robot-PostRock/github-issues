import { useState } from 'react';
import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { IssueFilters } from '../components/IssueFilters';
import { LabelPicker } from '../components/label-picker/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import { State } from '../interfaces/issues.interface';

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issuesQuery } = useIssues({
    state: state,
    selectedLabels: selectedLabels
  });

  const issues = issuesQuery.data ?? [];

  const onLabelSelected = (labels: string[]) => {
    setSelectedLabels(labels);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-4 sm:mt-5">
      <div className="col-span-1 sm:col-span-2 order-2 sm:order-1">
          <IssueFilters state={state} onStateChange={setState} />
          {issuesQuery.isLoading ? (
            <LoadingSpinner text='Cargando lista de issues...' />
          ) : (
            <IssueList issues={issues} />
          )}
      </div>

      <div className="col-span-1 order-1 sm:order-2">
        <LabelPicker
          onLabelSelected={onLabelSelected}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
