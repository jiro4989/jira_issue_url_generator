import React, { useState } from 'react'

import './App.css'
import {
  JIRAURL,
  parseQueryParam,
} from './lib/util'
import { priorityMedium, allPriorities, priority2Name, Priority } from './types/Priority'
import SelectComponent from './components/SelectComponent'
import InputComponent, { InputValue } from './components/InputComponent'

function App() {
  const [jiraURL, setJIRAURL] = useState('')
  const [jiraBaseURL, setJIRABaseURL] = useState('' as InputValue)
  const [projectID, setProjectID] = useState(1 as InputValue)
  const [issueType, setIssueType] = useState(1 as InputValue)
  const [summary, setSummary] = useState('' as InputValue)
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(priorityMedium)
  const [labels, setLabels] = useState([] as string[])

  function applyParams() {
    const jira: JIRAURL = parseQueryParam(jiraURL)
    setJIRABaseURL(jira.baseURL)
    setProjectID(jira.projectID)
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

  const qp = [
    `pid=${projectID}`,
    `issuetype=${issueType}`,
    `priority=${priority}`,
    `summary=${summary}`,
  ]
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
          <label>Set parameters from JIRA URL</label>
          <input
            type="text"
            onChange={(e) => setJIRAURL(e.target.value)}
            autoFocus
            placeholder="https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=1&priority=3&summary=hello_world"
          />
          <button className="ApplyButton" onClick={(e) => applyParams()}>
            Apply
          </button>
        </div>

        <hr />

        <InputComponent
          value={jiraBaseURL}
          setValue={setJIRABaseURL}
          type="text"
          label="Jira Base URL"
          isRequired={true}
          placeholder="https://example.com"
        />

        <InputComponent
          value={projectID}
          setValue={setProjectID}
          type="number"
          label="Project ID"
          isRequired={true}
          placeholder="1"
        />

        <InputComponent
          value={issueType}
          setValue={setIssueType}
          type="number"
          label="Issue Type"
          isRequired={true}
          placeholder="1"
        />

        <SelectComponent<Priority>
          value={priority}
          setValue={setPriority}
          optionValues={allPriorities}
          converter={priority2Name}
          label='Priority'
        />

        <InputComponent
          value={summary}
          setValue={setSummary}
          type="text"
          label="Summary"
          isRequired={true}
          placeholder=""
        />

        <div>
          <label>Description</label>
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
          <label>Generated URL</label>
          {generatedURLElement}
        </div>
      </section>
    </div>
  )
}

export default App
