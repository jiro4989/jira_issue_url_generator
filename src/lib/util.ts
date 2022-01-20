export class JIRAURL {
    constructor(
        public baseURL: string,
        public projectID: number,
        public issueType: number,
        public summary: string,
        public description: string,
        public priority: number,
        public labels: string[]
    ) {}
}

export type Priority = 1 | 2 | 3 | 4 | 5
export const priorityHighest: Priority = 1
export const priorityHigh: Priority = 2
export const priorityMedium: Priority = 3
export const priorityLow: Priority = 4
export const priorityLowest: Priority = 5
export const allPriorities: Priority[] = [priorityHighest, priorityHigh, priorityMedium, priorityLow, priorityLowest]

export function priorityString(priority: Priority): string {
    switch (priority) {
        case priorityHighest: return "Highest"
        case priorityHigh: return "High"
        case priorityMedium: return "Medium"
        case priorityLow: return "Low"
        case priorityLowest: return "Lowest"
    }
    return "Unknown"
}

export function parseQueryParam(url: string): JIRAURL {
    const urlObject = new URL(url)
    const urlSearchParams = new URLSearchParams(urlObject.search)

    const projectID = parseInt(urlSearchParams.get("pid") || "1")
    const issueType = parseInt(urlSearchParams.get("issuetype") || "1")
    const summary = urlSearchParams.get("summary") || ""
    const description = urlSearchParams.get("description") || ""
    const priority = parseInt(urlSearchParams.get("priority") || '' + priorityMedium)
    const labels = urlSearchParams.getAll("labels")

    const jiraURL = new JIRAURL(urlObject.origin, projectID, issueType, summary, description, priority, labels)
    return jiraURL
}