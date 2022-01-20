import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {JIRAURL, parseQueryParam } from './lib/util';

function App() {
  const [jiraURL, setJIRAURL] = useState("")
  const [jiraBaseURL, setJIRABaseURL] = useState("")
  const [issueType, setIssueType] = useState(0)
  const [summary, setSummary] = useState("")
  const [description, setDescription] = useState("")
  const [labels, setLabels] = useState([] as string[])

  const labelsElement = labels.map(e => <li><input type="text" value={e}></input></li>)

  function applyParams() {
    const jira: JIRAURL = parseQueryParam(jiraURL)
    setJIRABaseURL(jira.baseURL)
    setIssueType(jira.issueType)
    setSummary(jira.summary)
    setDescription(jira.description)
    setLabels(jira.labels)
  }

  const qp = [
    `issuetype=${issueType}`,
    `summary=${summary}`,
    `description=${description}`
  ]
  labels.map((e) => `labels=${e}`).forEach((e) => qp.push(e))
  const queryParams = qp.join("&")
  const generatedURL = encodeURI(`${jiraBaseURL}/secure/CreateIssueDetails!init.jspa?${queryParams}`)

  return (
    <div className="App">
      <div>
        <p>
          Set parameters from JIRA URL
        </p>
        <input type="text" onChange={(e) => setJIRAURL(e.target.value)} />
        <button onClick={(e) => applyParams()}>Apply</button>
      </div>

      <hr />

      <div>
        <p>
          Jira Base URL
        </p>
        <input type="text" onChange={(e) => setJIRABaseURL(e.target.value)} />
      </div>

      <div>
        <p>
          IssueType
        </p>
        <input type="number" onChange={(e) => setIssueType(parseInt(e.target.value))} />
      </div>

      <div>
        <p>
          Summary
        </p>
        <input type="text" onChange={(e) => setSummary(e.target.value)} />
      </div>

      <div>
        <p>
          Description
        </p>
        <textarea onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <p>
          Labels
        </p>
        <ul>
          {labelsElement}
        </ul>
      </div>

      <hr />

      <div>
        <p>
          Generated URL
        </p>
        <a href={generatedURL}>{summary}</a>
      </div>

    </div>
  );
}

export default App;
