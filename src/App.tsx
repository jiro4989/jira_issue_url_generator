import React, { useState } from 'react'
import './App.css'
import { JIRAURL, parseQueryParam } from './lib/util'

function App() {
  const [jiraURL, setJIRAURL] = useState('')
  const [jiraBaseURL, setJIRABaseURL] = useState('')
  const [issueType, setIssueType] = useState(1)
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [labels, setLabels] = useState([] as string[])

  function applyParams() {
    const jira: JIRAURL = parseQueryParam(jiraURL)
    setJIRABaseURL(jira.baseURL)
    setIssueType(jira.issueType)
    setSummary(jira.summary)
    setDescription(jira.description)
    setLabels(jira.labels)
  }

  function addLabelElement() {
    setLabels([...labels, ''])
  }

  function deleteLabelElement(index: number) {
    labels.splice(index, 1)
    setLabels([...labels])
  }

  function changeLabel(index: number, value: string) {
    labels[index] = value
    setLabels([...labels])
  }

  const qp = [`issuetype=${issueType}`, `summary=${summary}`]
  if (description !== '') {
    qp.push(`description=${description}`)
  }
  labels.map((e) => `labels=${e}`).forEach((e) => qp.push(e))
  const queryParams = qp.join('&')
  const generatedURL = encodeURI(
    `${jiraBaseURL}/secure/CreateIssueDetails!init.jspa?${queryParams}`
  )

  const labelsElement = labels.map((e, i) => (
    <li key={i}>
      <input
        className="LabelInput"
        type="text"
        value={e}
        onChange={(v) => changeLabel(i, v.target.value)}
      />
      <button className="LabelButton" onClick={(e) => deleteLabelElement(i)}>
        Delete
      </button>
    </li>
  ))

  function requiredValue(value: string): string {
    return value.trim() !== '' ? 'StateOK' : 'StateNG'
  }

  const generatedURLElement =
    summary === '' || jiraBaseURL === '' ? (
      <p>Please fix error input</p>
    ) : (
      <a href={generatedURL}>{summary}</a>
    )

  return (
    <div className="App">
      <h1>JIRA ISSUE URL GENERATOR</h1>
      <section>
        <h2>INPUT</h2>
        <div>
          <p>Set parameters from JIRA URL</p>
          <input type="text" onChange={(e) => setJIRAURL(e.target.value)} />
          <button className="ApplyButton" onClick={(e) => applyParams()}>
            Apply
          </button>
        </div>

        <hr />

        <div>
          <p>Jira Base URL</p>
          <input
            className={requiredValue(jiraBaseURL)}
            type="text"
            onChange={(e) => setJIRABaseURL(e.target.value)}
            value={jiraBaseURL}
          />
        </div>

        <div>
          <p>IssueType</p>
          <input
            className={requiredValue('' + issueType)}
            type="number"
            onChange={(e) => setIssueType(parseInt(e.target.value))}
            value={issueType}
          />
        </div>

        <div>
          <p>Summary</p>
          <input
            className={requiredValue(summary)}
            type="text"
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
          />
        </div>

        <div>
          <p>Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <div>
          <p>Labels</p>
          <p>
            <button className="AddButton" onClick={(e) => addLabelElement()}>
              Add
            </button>
          </p>
          <ul>{labelsElement}</ul>
        </div>
      </section>

      <section>
        <h2>OUTPUT</h2>
        <div>
          <p>Generated URL</p>
          {generatedURLElement}
        </div>
      </section>
    </div>
  )
}

export default App
