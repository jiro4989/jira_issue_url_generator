export function generateURL(jira) {
  const qp = [
    `pid=${encodeURIComponent(jira.projectID)}`,
    `issuetype=${encodeURIComponent(jira.issueType)}`,
    `priority=${encodeURIComponent(jira.priority)}`,
    `summary=${encodeURIComponent(jira.summary)}`,
  ];
  if (jira.description !== "") {
    qp.push(`description=${encodeURIComponent(jira.description)}`);
  }
  jira.labels
    .map((e) => `labels=${encodeURIComponent(e)}`)
    .forEach((e) => qp.push(e));

  const queryParams = qp.join("&");
  const url =
    `${jira.baseURL}/secure/CreateIssueDetails!init.jspa?${queryParams}`;
  return url;
}
