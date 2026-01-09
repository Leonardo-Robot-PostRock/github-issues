import { githubApi } from "../../api/github.api"
import { sleep } from "../../helpers"
import { GithubIssue, State } from "../interfaces/issues.interface"

export const getIssues = async (state: State, selectedLabels: string[]): Promise<GithubIssue[]> => {
    await sleep(1500)

    const params = new URLSearchParams();
    params.append('state', state)

    if (selectedLabels.length > 0) {
        params.append('labels', selectedLabels.join(','))
    }

    const { data } = await githubApi.get<GithubIssue[]>('/issues', {
        params
    })

    return data;
}