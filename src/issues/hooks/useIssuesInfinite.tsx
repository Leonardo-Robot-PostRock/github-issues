import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getIssues } from '../actions';
import { State } from '../interfaces/issues.interface';

interface Options {
    state: State;
    selectedLabels: string[];
    perPage: number;
}

export const useIssuesInfinite = ({ state, selectedLabels, perPage }: Options) => {
    const queryClient = useQueryClient();
    const key = ['issues', 'infinite', { state, selectedLabels, perPage }]

    const infiniteQuery = useInfiniteQuery({
        queryKey: key,
        initialPageParam: 1,
        queryFn: ({ pageParam = 1, queryKey }) => {
            const [, , args] = queryKey;
            const { state, selectedLabels, perPage } = args as Options;
            return getIssues(state, selectedLabels, pageParam, perPage);
        },
        getNextPageParam: (lastPage, pages) => {
            // if last page returned less than perPage, no more pages
            if (!lastPage || lastPage.length < perPage) return undefined;
            return pages.length + 1;
        },
        staleTime: 1000 * 60,
    });

    const issues = infiniteQuery.data ? infiniteQuery.data.pages.flat() : [];

    const reset = async () => {
        // cancel any in-flight requests and remove cached pages
        try {
            await queryClient.cancelQueries({ queryKey: key });
        } catch (_) {}

        try {
            queryClient.removeQueries({ queryKey: key });
        } catch (_) {}

        // fetch first page and populate cache with the infinite-query shape
        try {
            const firstPage = await getIssues(state, selectedLabels, 1, perPage);
            queryClient.setQueryData(key, {
                pages: [firstPage],
                pageParams: [1],
            });
        } catch (_) {
            // ignore
        }
    };

    return {
        infiniteQuery,
        issues,
        fetchNextPage: infiniteQuery.fetchNextPage,
        hasNextPage: Boolean(infiniteQuery.hasNextPage),
        isFetchingNextPage: infiniteQuery.isFetchingNextPage,
        reset,
    };
};

export default useIssuesInfinite;
