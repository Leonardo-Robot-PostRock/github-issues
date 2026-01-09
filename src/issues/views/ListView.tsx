import { useState } from 'react';
import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
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
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2 order-2 sm:order-1">
        {
          issuesQuery.isLoading
            ? <LoadingSpinner text='Cargando lista de issues...' />
            : <IssueList issues={issues} onStateChange={setState} state={state} />
        }
      </div>

      <div className="col-span-1 order-1 sm:order-2 px-2">
        <LabelPicker
          onLabelSelected={onLabelSelected}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
