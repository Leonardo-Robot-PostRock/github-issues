import { useQuery } from "@tanstack/react-query"
import { getIssue } from "../actions"

export const useIssue = (issueNumber: number) => {

    const issueQuery = useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60,
    })

    return {
        issueQuery
    }
}