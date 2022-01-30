import { Jira, parseQueryParam } from './Jira'

const origin = 'https://example.com'
const baseURL = `${origin}/secure/CreateIssueDetails!init.jspa`

describe('generateURL', () => {
  const testCases = [
    {
      description: '正常系: すべてのフィールドがクエリパラメータになる',
      inJira: new Jira(origin, 1, 2, 'summary', 'desc', 4, ['hello', 'world']),
      want: `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary&description=desc&labels=hello&labels=world`,
    },
    {
      description:
        '正常系: ラベルが1つだけ設定されてる場合はクエリパラメータも1つだけになる',
      inJira: new Jira(origin, 1, 2, 'summary', 'desc', 4, ['hello']),
      want: `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary&description=desc&labels=hello`,
    },
    {
      description: '正常系: ラベルが無い場合はクエリパラメータも無い',
      inJira: new Jira(origin, 1, 2, 'summary', 'desc', 4, []),
      want: `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary&description=desc`,
    },
    {
      description: '正常系: descriptionが無い場合はクエリパラメータも無い',
      inJira: new Jira(origin, 1, 2, 'summary', '', 4, []),
      want: `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary`,
    },
    {
      description: '正常系: マルチバイト文字はパーセントエンコーディングされる',
      inJira: new Jira(origin, 1, 2, 'あ', 'い', 4, []),
      want: `${baseURL}?pid=1&issuetype=2&priority=4&summary=%E3%81%82&description=%E3%81%84`,
    },
    {
      description: '正常系: &も=もパーセントエンコーディングされる',
      inJira: new Jira(origin, 1, 2, 'a=1&a=2', 'b=1&b=2', 4, []),
      want: `${baseURL}?pid=1&issuetype=2&priority=4&summary=a%3D1%26a%3D2&description=b%3D1%26b%3D2`,
    },
  ]

  for (const testCase of testCases) {
    const { description, inJira, want } = testCase

    test(description, () => {
      const got = inJira.generateURL()
      expect(got).toEqual(want)
    })
  }
})

describe('validateURL', () => {
  const testCases = [
    {
      description: '正常系: 必須の項目を満たしていればtrue',
      inJira: new Jira(origin, 1, 2, 'summary', 'desc', 3, ['hello', 'world']),
      want: true,
    },
    {
      description: '正常系: JiraBaseURLがなければfalse',
      inJira: new Jira('', 1, 2, 'summary', 'desc', 3, ['hello', 'world']),
      want: false,
    },
    {
      description: '正常系: ProjectIDがなければfalse',
      inJira: new Jira(origin, 0, 2, 'summary', 'desc', 3, ['hello', 'world']),
      want: false,
    },
    {
      description: '正常系: IssueTypeがなければfalse',
      inJira: new Jira(origin, 1, 0, 'summary', 'desc', 3, ['hello', 'world']),
      want: false,
    },
    {
      description: '正常系: Summaryがなければfalse',
      inJira: new Jira(origin, 1, 2, '', 'desc', 3, ['hello', 'world']),
      want: false,
    },
    {
      description: '正常系: Priorityがなければfalse',
      inJira: new Jira(origin, 1, 2, 'summary', 'desc', 0, ['hello', 'world']),
      want: false,
    },
  ]

  for (const testCase of testCases) {
    const { description, inJira, want } = testCase

    test(description, () => {
      const got = inJira.validateURL()
      expect(got).toEqual(want)
    })
  }
})

describe('parseQueryParam', () => {
  const testCases = [
    {
      description: '正常系: すべてのクエリパラメータを解釈できる',
      inURL: `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary&description=desc&labels=hello&labels=world`,
      want: new Jira(origin, 1, 2, 'summary', 'desc', 4, ['hello', 'world']),
    },
    {
      description: '正常系: labelsは省略可能',
      inURL: `${baseURL}?pid=1&issuetype=2&priority=4&summary=summary&description=desc`,
      want: new Jira(origin, 1, 2, 'summary', 'desc', 4, []),
    },
    {
      description: '正常系: pidを省略すると1',
      inURL: `${baseURL}?issuetype=2&priority=4&summary=summary&description=desc`,
      want: new Jira(origin, 1, 2, 'summary', 'desc', 4, []),
    },
    {
      description: '正常系: issuetypeを省略すると1',
      inURL: `${baseURL}?pid=1&priority=4&summary=summary&description=desc`,
      want: new Jira(origin, 1, 1, 'summary', 'desc', 4, []),
    },
    {
      description: '正常系: priorityを省略すると3',
      inURL: `${baseURL}?pid=1&summary=summary&description=desc`,
      want: new Jira(origin, 1, 1, 'summary', 'desc', 3, []),
    },
    {
      description: '正常系: summaryを省略すると空文字列',
      inURL: `${baseURL}?pid=1&description=desc`,
      want: new Jira(origin, 1, 1, '', 'desc', 3, []),
    },
    {
      description: '正常系: descriptionを省略すると空文字列',
      inURL: `${baseURL}?pid=1`,
      want: new Jira(origin, 1, 1, '', '', 3, []),
    },
    {
      description: '正常系: パーセントエンコーディングされたURLはデコードする',
      inURL: `${baseURL}?summary=%E3%81%82&description=%E3%81%84`,
      want: new Jira(origin, 1, 1, 'あ', 'い', 3, []),
    },
    {
      description: '正常系: &や=もパーセントエンコーディングされる',
      inURL: `${baseURL}?summary=a%3D1&description=%26b%3D2`,
      want: new Jira(origin, 1, 1, 'a=1', '&b=2', 3, []),
    },
  ]

  for (const testCase of testCases) {
    const { description, inURL, want } = testCase

    test(description, () => {
      const got = parseQueryParam(inURL)
      expect(got).toEqual(want)
    })
  }
})
