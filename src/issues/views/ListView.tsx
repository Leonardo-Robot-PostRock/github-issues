import { useEffect, useRef, useState } from 'react';
import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { IssueFilters } from '../components/IssueFilters';
import { LabelPicker } from '../components/label-picker/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import useIssuesInfinite from '../hooks/useIssuesInfinite';
import { State } from '../interfaces/issues.interface';
import Pagination from '../components/Pagination';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [perPage, setPerPage] = useState<number>(10);
  const [infiniteEnabled, setInfiniteEnabled] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const { issuesQuery, page, nextPage, prevPage, setPage } = useIssues({
    state,
    selectedLabels,
    perPage,
  });

  const infinite = useIssuesInfinite({ state, selectedLabels, perPage });

  const issues = infiniteEnabled ? infinite.issues : (issuesQuery.data ?? []);

  const onLabelSelected = (labels: string[]) => setSelectedLabels(labels);

  useInfiniteScroll({
    containerRef: listRef,
    enabled: infiniteEnabled,
    fetchNext: infinite.fetchNextPage,
    hasNextPage: infinite.hasNextPage,
    isFetchingNextPage: infinite.isFetchingNextPage,
  });

  // choose correct loading state depending on mode
  const isLoading = infiniteEnabled ? infinite.infiniteQuery.isLoading : issuesQuery.isLoading;

  // reset infinite scroll when filters or pagination change (do NOT reset when toggling infinite)
  useEffect(() => {
    if (!infiniteEnabled) return;

    let mounted = true;

    async function doReset() {
      if (!mounted) return;
      if (infinite.reset) {
        await infinite.reset();
      }
      // only reset scroll when filters/pagination change (not when toggling infinite)
      if (listRef.current) listRef.current.scrollTop = 0;
    }

    doReset();

    return () => {
      mounted = false;
    };
    // note: do not include `infiniteEnabled` to avoid running on toggle
  }, [state, selectedLabels, perPage]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-4 sm:mt-5">
      <div className="col-span-1 sm:col-span-2 order-2 sm:order-1">
        {/* Issue Filters */}
        <IssueFilters state={state} onStateChange={setState} />

        {isLoading ? (
          <LoadingSpinner text='Cargando lista de issues...' />
        ) : (
          <div className='p-2'>
            {/* Issues Count */}
            <div className="mb-6 text-sm text-gray-400">
              Showing <span className="font-semibold text-white">{issues.length}</span> issue{issues.length !== 1 ? 's' : ''}
            </div>
            <div className='flex justify-start mb-2'>

              {/* Infinite Scroll */}
              <label className='flex items-center gap-2 text-sm text-gray-300'>
                <input type='checkbox' checked={infiniteEnabled} onChange={(e) => setInfiniteEnabled(e.target.checked)} />
                <span>Infinite scroll</span>
              </label>
            </div>

            {/* Issue List */}
            <div className='flex items-center justify-between gap-4'>
              <div className='flex-1'>
                <IssueList
                  issues={issues}
                  perPage={perPage}
                  containerRef={listRef}
                  infiniteEnabled={infiniteEnabled}
                  footer={infiniteEnabled && infinite.isFetchingNextPage ? <LoadingSpinner text='Cargando más...' /> : null}
                />
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!infiniteEnabled && (
          <div className='mt-3'>
            <Pagination
              page={page}
              perPage={perPage}
              setPerPage={(n) => { setPerPage(n); setPage(1); }}
              nextPage={nextPage}
              prevPage={prevPage}
              setPage={setPage}
              hasPrev={page > 1}
              hasNext={issuesQuery.data && issuesQuery.data.length === perPage}
            />
          </div>
        )}
      </div>

      {/* Label picker to select a label */}
      <div className="col-span-1 order-1 sm:order-2">
        <LabelPicker onLabelSelected={onLabelSelected} selectedLabels={selectedLabels} />
      </div>
    </div>
  );
};
