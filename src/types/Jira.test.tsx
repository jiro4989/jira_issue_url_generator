import { Jira, parseQueryParam } from './Jira'

describe('generateURL', () => {
  const origin = 'https://example.com'
  const baseURL = `${origin}/secure/CreateIssueDetails!init.jspa`

  test('すべてのフィールドがクエリパラメータになる', () => {
    const jira = new Jira(origin, 1, 2, 'summary', 'desc', 4, [
      'hello',
      'world',
    ])
    const got = jira.generateURL()
    const want = `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary&description=desc&labels=hello&labels=world`
    expect(got).toEqual(want)
  })

  test('ラベルが1つだけ設定されてる場合はクエリパラメータも1つだけになる', () => {
    const jira = new Jira(origin, 1, 2, 'summary', 'desc', 4, ['hello'])
    const got = jira.generateURL()
    const want = `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary&description=desc&labels=hello`
    expect(got).toEqual(want)
  })

  test('ラベルが無い場合はクエリパラメータも無い', () => {
    const jira = new Jira(origin, 1, 2, 'summary', 'desc', 4, [])
    const got = jira.generateURL()
    const want = `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary&description=desc`
    expect(got).toEqual(want)
  })

  test('descriptionが無い場合はクエリパラメータも無い', () => {
    const jira = new Jira(origin, 1, 2, 'summary', '', 4, [])
    const got = jira.generateURL()
    const want = `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary`
    expect(got).toEqual(want)
  })

  test('マルチバイト文字はパーセントエンコーディングされる', () => {
    const jira = new Jira(origin, 1, 2, 'あ', 'い', 4, [])
    const got = jira.generateURL()
    const want = `${baseURL}?pid=1&issuetype=2&priority=4&summary=%E3%81%82&description=%E3%81%84`
    expect(got).toEqual(want)
  })
})

describe('parseQueryParam', () => {
  const origin = 'https://example.com'
  const baseURL = `${origin}/secure/CreateIssueDetails!init.jspa`

  test('すべてのクエリパラメータを解釈できる', () => {
    const url = `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary&description=desc&labels=hello&labels=world`
    const got = parseQueryParam(url)
    const want = new Jira(origin, 1, 2, 'summary', 'desc', 4, [
      'hello',
      'world',
    ])
    expect(got).toEqual(want)
  })

  test('labelsは省略可能', () => {
    const url = `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary&description=desc`
    const got = parseQueryParam(url)
    const want = new Jira(origin, 1, 2, 'summary', 'desc', 4, [])
    expect(got).toEqual(want)
  })

  test('pidを省略すると1', () => {
    const url = `${baseURL}?issuetype=2&priority=4&summary=summary&description=desc`
    const got = parseQueryParam(url)
    const want = new Jira(origin, 1, 2, 'summary', 'desc', 4, [])
    expect(got).toEqual(want)
  })

  test('issuetypeを省略すると1', () => {
    const url = `${baseURL}?pid=1&priority=4&summary=summary&description=desc`
    const got = parseQueryParam(url)
    const want = new Jira(origin, 1, 1, 'summary', 'desc', 4, [])
    expect(got).toEqual(want)
  })

  test('priorityを省略すると3', () => {
    const url = `${baseURL}?pid=1&summary=summary&description=desc`
    const got = parseQueryParam(url)
    const want = new Jira(origin, 1, 1, 'summary', 'desc', 3, [])
    expect(got).toEqual(want)
  })

  test('summaryを省略すると空文字列', () => {
    const url = `${baseURL}?pid=1&description=desc`
    const got = parseQueryParam(url)
    const want = new Jira(origin, 1, 1, '', 'desc', 3, [])
    expect(got).toEqual(want)
  })

  test('descriptionを省略すると空文字列', () => {
    const url = `${baseURL}?pid=1`
    const got = parseQueryParam(url)
    const want = new Jira(origin, 1, 1, '', '', 3, [])
    expect(got).toEqual(want)
  })

  test('パーセントエンコーディングされたURLはデコードする', () => {
    const url = `${baseURL}?summary=%E3%81%82&description=%E3%81%84`
    const got = parseQueryParam(url)
    const want = new Jira(origin, 1, 1, 'あ', 'い', 3, [])
    expect(got).toEqual(want)
  })
})
