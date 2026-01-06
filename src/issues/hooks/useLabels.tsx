import { useQuery } from '@tanstack/react-query'
import { getLabels } from '../actions/get-labels-action'
import { GithubLabel } from '../interfaces/label.interface'

/**
 * Hook that fetches GitHub labels for the React repository.
 * 
 * @remarks
 * This hook uses TanStack Query to manage label data with the following caching strategy:
 * - **staleTime**: Set to 1 hour (3,600,000ms). Data is considered fresh for this duration,
 *   preventing unnecessary refetches within this window.
 * - **initialData**: Provides placeholder label data that is immediately available before
 *   the first query executes. This data is considered fresh initially and won't trigger
 *   an immediate refetch. After staleTime expires, the query will refetch fresh data
 *   from the API, replacing the initial data.
 * 
 * The combination of staleTime + initialData optimizes UX by:
 * 1. Showing data instantly on component mount (via initialData)
 * 2. Avoiding redundant API calls for 1 hour (via staleTime)
 * 3. Ensuring fresh data is fetched once the cache expires
 * 
 * @returns {Object} An object containing the labels query state and methods
 * @returns {UseQueryResult<GithubLabel[]>} labelsQuery - The TanStack Query result with labels data
 * 
 * @example
 * const { labelsQuery } = useLabels();
 * if (labelsQuery.isLoading) return <p>Loading...</p>;
 * return <ul>{labelsQuery.data?.map(label => <li key={label.id}>{label.name}</li>)}</ul>;
 */
export const useLabels = () => {

    // TODO: documentar como funciona staleTime + initialData


    const labelsQuery = useQuery({
        queryKey: ['react', 'labels'],
        queryFn: getLabels,
        staleTime: 1000 * 60 * 60, // 1 hour
        // placeholderData: [
        //     {
        //         "id": 69105358,
        //         "node_id": "MDU6TGFiZWw2OTEwNTM1OA==",
        //         "url": "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
        //         "name": "Browser: Safari",
        //         "color": "c7def8",
        //         "default": false,
        //         "description": null
        //     } satisfies GithubLabel,
        //     {
        //         "id": 127893911,
        //         "node_id": "MDU6TGFiZWwxMjc4OTM5MTE=",
        //         "url": "https://api.github.com/repos/facebook/react/labels/Component:%20DOM",
        //         "name": "Component: DOM",
        //         "color": "fef2c0",
        //         "default": false,
        //         "description": null
        //     } satisfies GithubLabel
        // ]
        initialData: [
            {
                "id": 69105358,
                "node_id": "MDU6TGFiZWw2OTEwNTM1OA==",
                "url": "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
                "name": "Browser: Safari",
                "color": "c7def8",
                "default": false,
                "description": null
            } satisfies GithubLabel,
            {
                "id": 127893911,
                "node_id": "MDU6TGFiZWwxMjc4OTM5MTE=",
                "url": "https://api.github.com/repos/facebook/react/labels/Component:%20DOM",
                "name": "Component: DOM",
                "color": "fef2c0",
                "default": false,
                "description": null
            } satisfies GithubLabel
        ]
    })

    return {
        labelsQuery
    }
}
