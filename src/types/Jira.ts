import { priorityMedium } from './Priority'

export class Jira {
  constructor(
    public baseURL: string,
    public projectID: number,
    public issueType: number,
    public summary: string,
    public description: string,
    public priority: number,
    public labels: string[]
  ) {}

  generateURL(): string {
    const qp = [
      `pid=${this.projectID}`,
      `issuetype=${this.issueType}`,
      `priority=${this.priority}`,
      `summary=${this.summary}`,
    ]
    if (this.description !== '') {
      qp.push(`description=${this.description}`)
    }
    this.labels.map((e) => `labels=${e}`).forEach((e) => qp.push(e))

    const queryParams = qp.join('&')
    const url = encodeURI(
      `${this.baseURL}/secure/CreateIssueDetails!init.jspa?${queryParams}`
    )

    return url
  }

  validateURL(): boolean {
    if (this.baseURL === '') return false
    if (this.projectID < 1) return false
    if (this.issueType < 1) return false
    if (this.summary === '') return false
    if (this.priority < 1 || 5 < this.priority) return false
    return true
  }
}

export function parseQueryParam(url: string): Jira {
  const urlObject = new URL(url)
  const urlSearchParams = new URLSearchParams(urlObject.search)

  const projectID = parseInt(urlSearchParams.get('pid') || '1')
  const issueType = parseInt(urlSearchParams.get('issuetype') || '1')
  const summary = urlSearchParams.get('summary') || ''
  const description = urlSearchParams.get('description') || ''
  const priority = parseInt(
    urlSearchParams.get('priority') || '' + priorityMedium
  )
  const labels = urlSearchParams.getAll('labels')

  const jiraURL = new Jira(
    urlObject.origin,
    projectID,
    issueType,
    summary,
    description,
    priority,
    labels
  )
  return jiraURL
}
