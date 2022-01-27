import React, { useState } from 'react'

import './App.css'
import { Jira, parseQueryParam } from './types/Jira'
import {
  priorityMedium,
  allPriorities,
  priority2Name,
  Priority,
} from './types/Priority'
import SelectComponent from './components/SelectComponent'
import InputComponent, { InputValue } from './components/InputComponent'
import TextareaComponent from './components/TextareaComponent'
import InputListComponent from './components/InputListComponent'

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
    const jira: Jira = parseQueryParam(jiraURL)
    setJIRABaseURL(jira.baseURL)
    setProjectID(jira.projectID)
    setIssueType(jira.issueType)
    setSummary(jira.summary)
    setDescription(jira.description)
    setLabels(jira.labels)
  }

  const jira = new Jira(
    jiraBaseURL as string,
    projectID as number,
    issueType as number,
    summary as string,
    description,
    priority,
    labels
  )
  const generatedURLElement = jira.validateURL() ? (
    <div>
      <label>Generated URL</label>
      <a data-testid="output" href={jira.generateURL()}>
        {summary}
      </a>
    </div>
  ) : (
    <div>
      <p>Please fix error input</p>
    </div>
  )

  return (
    <div className="App">
      <h1>JIRA ISSUE URL GENERATOR</h1>
      <section>
        <h2>INPUT</h2>
        <div>
          <label className='ComponentLabel'>Set parameters from JIRA URL
          <input
            className='Input FullWidth'
            type="text"
            onChange={(e) => setJIRAURL(e.target.value)}
            autoFocus
            placeholder="https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=1&priority=3&summary=hello_world"
          />
          </label>
          <button className="VeryShortWidth" onClick={(e) => applyParams()}>
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
          label="Priority"
        />

        <InputComponent
          value={summary}
          setValue={setSummary}
          type="text"
          label="Summary"
          isRequired={true}
          placeholder=""
        />

        <TextareaComponent
          value={description}
          setValue={setDescription}
          label="Description"
        />

        <InputListComponent
          values={labels}
          setValues={setLabels}
          label="Labels"
        />
      </section>

      <section>
        <h2>OUTPUT</h2>
        {generatedURLElement}
      </section>
    </div>
  )
}

export default App
