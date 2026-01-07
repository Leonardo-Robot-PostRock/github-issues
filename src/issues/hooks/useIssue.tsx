import { useQuery } from "@tanstack/react-query"
import { getIssue, getIssueComments } from "../actions"

export const useIssue = (issueNumber: number) => {

    const issueQuery = useQuery({
        queryKey: ['issues', issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60,
    })

    // const commentsQuery = useQuery({
    //     queryKey: ['issues', issueNumber, 'comments'],
    //     queryFn: () => getIssueComments(issueNumber),
    //     staleTime: 1000 * 60,
    // })

    const issueNumberData = issueQuery.data?.number;

    const commentsQuery = useQuery({
        queryKey: ['issues', issueNumberData, 'comments'],
        queryFn: () => getIssueComments(issueNumberData!),
        staleTime: 1000 * 60,
        enabled: issueQuery.data !== undefined,
    })

    return {
        issueQuery,
        commentsQuery
    }
}