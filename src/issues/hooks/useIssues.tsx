import { useQuery } from "@tanstack/react-query"
import { getIssues } from "../actions"
import { State } from "../interfaces/issues.interface"
import { useEffect, useState } from "react"

interface Options {
    state: State,
    selectedLabels: string[],
    perPage: number
}

export const useIssues = ({ state, selectedLabels, perPage }: Options) => {
    const [page, setPage] = useState(1);

    const issuesQuery = useQuery({
        queryKey: ['issues', { state, selectedLabels, page, perPage }],
        queryFn: () => getIssues(state, selectedLabels, page, perPage),
        staleTime: 1000 * 60 // 1 minute
    })

    useEffect(() => {
        setPage(1);


    }, [state])

    useEffect(() => {
        setPage(1);
    }, [selectedLabels])

    useEffect(() => {
        setPage(1);
    }, [perPage])

    const nextPage = () => {
        if (!issuesQuery.data) return;
        // prevent advancing past last page when returned items are fewer than perPage
        if (issuesQuery.data.length < perPage) return;

        setPage(page + 1)
    }

    const prevPage = () => {
        if (page === 1) return;

        setPage((prevPage) => prevPage - 1);
    }

    return {
        issuesQuery,
        page,
        nextPage,
        prevPage,
        setPage,
    }
}
