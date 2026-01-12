import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers"
import { GithubIssue, State } from "../interfaces/issues.interface"

export const getIssues = async (state: State, selectedLabels: string[], page:number, perPage = 5): Promise<GithubIssue[]> => {
    await sleep(1500)

    const params = new URLSearchParams();
    
    if (selectedLabels.length > 0) {
        params.append('labels', selectedLabels.join(','))
    }
    
    params.append('page', `${page}`)
    params.append('state', state)
    params.append('per_page', `${perPage}`)

    const { data } = await githubApi.get<GithubIssue[]>('/issues', {
        params
    })

    return data;
}