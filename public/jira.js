class Jira {
  constructor(
    baseURL,
    projectID,
    issueType,
    priority,
    summary,
    description,
    labels,
  ) {
    this.baseURL = baseURL;
    this.projectID = projectID;
    this.issueType = issueType;
    this.priority = priority;
    this.summary = summary;
    this.description = description;
    this.labels = labels;
  }

  generateURL() {
    const qp = [
      `pid=${encodeURIComponent(this.projectID)}`,
      `issuetype=${encodeURIComponent(this.issueType)}`,
      `priority=${encodeURIComponent(this.priority)}`,
      `summary=${encodeURIComponent(this.summary)}`,
    ];
    if (this.description !== "") {
      qp.push(`description=${encodeURIComponent(this.description)}`);
    }
    this.labels.map((e) => `labels=${encodeURIComponent(e)}`).forEach((e) =>
      qp.push(e)
    );
    const queryParams = qp.join("&");
    return `${this.baseURL}/secure/CreateIssueDetails!init.jspa?${queryParams}`;
  }

  static createByURL(url) {
    const urlObject = new URL(url);
    const urlSearchParams = new URLSearchParams(urlObject.search);
    const baseURL = urlObject.origin;
    const projectID = parseInt(urlSearchParams.get("pid") || "1");
    const issueType = parseInt(urlSearchParams.get("issuetype") || "1");
    const summary = urlSearchParams.get("summary") || "";
    const description = urlSearchParams.get("description") || "";
    const priority = parseInt(urlSearchParams.get("priority") || "1");
    const labels = urlSearchParams.getAll("labels");
    return new Jira(
      baseURL,
      projectID,
      issueType,
      priority,
      summary,
      description,
      labels,
    );
  }
}

export default Jira;
