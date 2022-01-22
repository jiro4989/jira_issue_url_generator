import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Appのデフォルト状態', () => {
  test('Jira Base URLが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Jira Base URL/)
    expect(got).toBeInTheDocument()
  })

  test('Project IDが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Project ID/)
    expect(got).toBeInTheDocument()
  })

  test('Issue Typeが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Issue Type/)
    expect(got).toBeInTheDocument()
  })

  test('Priorityが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Priority/)
    expect(got).toBeInTheDocument()
  })

  test('Summaryが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Summary/)
    expect(got).toBeInTheDocument()
  })

  test('Descriptionが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Description/)
    expect(got).toBeInTheDocument()
  })

  test('Labelsが含まれる', () => {
    render(<App />)
    const got = screen.getByText(/Labels/)
    expect(got).toBeInTheDocument()
  })
})
