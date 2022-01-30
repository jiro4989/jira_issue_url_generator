import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('デフォルト状態に対するテスト', () => {
  const testCases = [
    {
      description: '正常系: Jira Base URLが含まれる',
      regex: /Jira Base URL/i,
    },
    {
      description: '正常系: Project IDが含まれる',
      regex: /Project ID/i,
    },
    {
      description: '正常系: Issue Typeが含まれる',
      regex: /Issue Type/i,
    },
    {
      description: '正常系: Priorityが含まれる',
      regex: /Priority/i,
    },
    {
      description: '正常系: Summaryが含まれる',
      regex: /Summary/i,
    },
    {
      description: '正常系: Descriptionが含まれる',
      regex: /Description/i,
    },
    {
      description: '正常系: Labelsが含まれる',
      regex: /Labels/i,
    },
  ]

  for (const testCase of testCases) {
    const { description, regex } = testCase
    test(description, () => {
      render(<App />)
      const got = screen.getByText(regex)
      expect(got).toBeInTheDocument()
    })
  }
})

describe('UIの変更結果に対するテスト', () => {
  const origin = 'https://example.com'
  const baseURL = `${origin}/secure/CreateIssueDetails!init.jspa`

  test('正常系: 必須の項目をすべて埋めればOutputのURLが得られる', async () => {
    render(<App />)

    const summary = 'sushi'

    fireEvent.change(screen.getByLabelText(/Jira Base URL/i), {
      target: { value: 'https://example.com' },
    })
    fireEvent.change(screen.getByLabelText(/Project ID/i), {
      target: { value: 1 },
    })
    fireEvent.change(screen.getByLabelText(/Issue Type/i), {
      target: { value: 2 },
    })
    fireEvent.change(screen.getByLabelText(/Priority/i), {
      target: { value: 3 },
    })
    fireEvent.change(screen.getByLabelText(/Summary/i), {
      target: { value: summary },
    })
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'coffee' },
    })

    const got = await screen.findByTestId('output')
    expect(got).toHaveTextContent(summary)
    expect(got).toHaveAttribute(
      'href',
      `${baseURL}?pid=1&issuetype=2&priority=3&summary=sushi&description=coffee`
    )
  })

  const errorTestCases = [
    {
      description:
        '正常系: 必須の項目(Jira Base URL)が足りなければOutputは得られない',
      inJiraBaseURL: '',
      inProjectID: 1,
      inIssueType: 2,
      inPriority: 3,
      inSummary: 'sushi',
      inDescription: 'coffee',
    },
    {
      description:
        '正常系: 必須の項目(projectID)が足りなければOutputは得られない',
      inJiraBaseURL: 'https://example.com',
      inProjectID: 0,
      inIssueType: 2,
      inPriority: 3,
      inSummary: 'sushi',
      inDescription: 'coffee',
    },
    {
      description:
        '正常系: 必須の項目(issue type)が足りなければOutputは得られない',
      inJiraBaseURL: 'https://example.com',
      inProjectID: 1,
      inIssueType: 0,
      inPriority: 3,
      inSummary: 'sushi',
      inDescription: 'coffee',
    },
    {
      description:
        '正常系: 必須の項目(summary)が足りなければOutputは得られない',
      inJiraBaseURL: 'https://example.com',
      inProjectID: 1,
      inIssueType: 2,
      inPriority: 3,
      inSummary: '',
      inDescription: 'coffee',
    },
  ]

  for (const testCase of errorTestCases) {
    const {
      description,
      inJiraBaseURL,
      inProjectID,
      inIssueType,
      inPriority,
      inSummary,
      inDescription,
    } = testCase

    test(description, async () => {
      render(<App />)

      fireEvent.change(screen.getByLabelText(/Jira Base URL/i), {
        target: { value: inJiraBaseURL },
      })
      fireEvent.change(screen.getByLabelText(/Project ID/i), {
        target: { value: inProjectID },
      })
      fireEvent.change(screen.getByLabelText(/Issue Type/i), {
        target: { value: inIssueType },
      })
      fireEvent.change(screen.getByLabelText(/Priority/i), {
        target: { value: inPriority },
      })
      fireEvent.change(screen.getByLabelText(/Summary/i), {
        target: { value: inSummary },
      })
      fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { value: inDescription },
      })

      const got = await screen.getByText(/Please fix error input/i)
      expect(got).toBeInTheDocument()
    })
  }
})

describe('URLを分解するフォームのテスト', () => {
  const origin = 'https://example.com'
  const baseURL = `${origin}/secure/CreateIssueDetails!init.jspa`

  test('正常系: URLを分解するフォームを入力してボタンを押すと各種inputが補完される', async () => {
    render(<App />)

    const summary = 'sushi'

    fireEvent.change(screen.getByLabelText(/Set parameters from JIRA URL/i), {
      target: {
        value: `${baseURL}?pid=9&issuetype=2&priority=3&summary=sushi&description=coffee%26tea`,
      },
    })
    fireEvent.click(await screen.findByTestId('apply-button'))

    expect(screen.getByLabelText(/Jira Base URL/i)).toHaveValue(origin)
    expect(screen.getByLabelText(/Project ID/i)).toHaveValue(9)
    expect(screen.getByLabelText(/Issue Type/i)).toHaveValue(2)
    expect(screen.getByLabelText(/Summary/i)).toHaveValue(summary)
    expect(screen.getByLabelText(/Description/i)).toHaveValue('coffee&tea')

    const got = await screen.findByTestId('output')
    expect(got).toHaveTextContent(summary)
    expect(got).toHaveAttribute(
      'href',
      `${baseURL}?pid=9&issuetype=2&priority=3&summary=sushi&description=coffee%26tea`
    )
  })
})
