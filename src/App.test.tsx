import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('デフォルト状態に対するテスト', () => {
  test('Jira Base URLが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Jira Base URL/i)
    expect(got).toBeInTheDocument()
  })

  test('Project IDが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Project ID/i)
    expect(got).toBeInTheDocument()
  })

  test('Issue Typeが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Issue Type/i)
    expect(got).toBeInTheDocument()
  })

  test('Priorityが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Priority/i)
    expect(got).toBeInTheDocument()
  })

  test('Summaryが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Summary/i)
    expect(got).toBeInTheDocument()
  })

  test('Descriptionが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Description/i)
    expect(got).toBeInTheDocument()
  })

  test('Labelsが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Labels/i)
    expect(got).toBeInTheDocument()
  })
})

describe('UIの変更結果に対するテスト', () => {
  const origin = 'https://example.com'
  const baseURL = `${origin}/secure/CreateIssueDetails!init.jspa`

  test('Jira Base URLが含まれる', async () => {
    render(<App />)

    const summary = 'sushi'

    fireEvent.change(screen.getByLabelText(/Jira Base URL/i), {
      target: {value: 'https://example.com'}
    })
    fireEvent.change(screen.getByLabelText(/Project ID/i), {
      target: {value: 1}
    })
    fireEvent.change(screen.getByLabelText(/Issue Type/i), {
      target: {value: 2}
    })
    fireEvent.change(screen.getByLabelText(/Priority/i), {
      target: {value: 3}
    })
    fireEvent.change(screen.getByLabelText(/Summary/i), {
      target: {value: summary}
    })
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: {value: 'coffee'}
    })

    const got = await screen.findByRole('output')
    expect(got).toHaveTextContent(summary)
    expect(got).toHaveAttribute('href', `${baseURL}?pid=1&issuetype=2&priority=3&summary=sushi&description=coffee`)
  })
})