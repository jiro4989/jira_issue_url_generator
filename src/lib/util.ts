import { priorityMedium } from '../types/Priority'

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

export function parseQueryParam(url: string): JIRAURL {
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

  const jiraURL = new JIRAURL(
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
