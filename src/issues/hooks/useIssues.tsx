import { useQuery } from "@tanstack/react-query"
import { getIssues } from "../actions"
import { State } from "../interfaces/issues.interface"

interface Options {
    state: State,
    selectedLabels: string[]
}

export const useIssues = ({ state, selectedLabels }: Options) => {
    const issuesQuery = useQuery({
        queryKey: ['issues', { state, selectedLabels }],
        queryFn: () => getIssues(state, selectedLabels),
        staleTime: 1000 * 60 // 1 minute
    })

    return {
        issuesQuery
    }
}
