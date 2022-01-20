export class JIRAURL {
    constructor(
        public baseURL: string,
        public issueType: number,
        public summary: string,
        public description: string,
        public labels: string[]
    ) {}
}

export function parseQueryParam(url: string): JIRAURL {
    const urlObject = new URL(url)
    const urlSearchParams = new URLSearchParams(urlObject.search)

    const issueType = parseInt(urlSearchParams.get("issuetype") || "")
    const summary = urlSearchParams.get("summary") || ""
    const description = urlSearchParams.get("description") || ""
    const labels = urlSearchParams.getAll("labels")

    const jiraURL = new JIRAURL(urlObject.origin, issueType, summary, description, labels)
    return jiraURL
}