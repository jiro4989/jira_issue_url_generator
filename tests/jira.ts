import { assertEquals } from "@std/assert";
import Jira from "../public/jira.js";

const generateURLTestCases = [
  {
    name: "正常系: labels 以外のすべてが揃っている場合は生成できる",
    jira: new Jira("https://example.com", 1, 2, 3, "hello", "world", []),
    want:
      "https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=2&priority=3&summary=hello&description=world",
  },
  {
    name: "正常系: description が空の場合は省略",
    jira: new Jira("https://example.com", 1, 2, 3, "hello", "", []),
    want:
      "https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=2&priority=3&summary=hello",
  },
  {
    name: "正常系: labels は複数設定されうる",
    jira: new Jira("https://example.com", 1, 2, 3, "hello", "", ["su", "shi"]),
    want:
      "https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=2&priority=3&summary=hello&labels=su&labels=shi",
  },
];

for (const tc of generateURLTestCases) {
  Deno.test(`Jira.generateURL() - ${tc.name}`, () => {
    const got = tc.jira.generateURL();
    assertEquals(got, tc.want);
  });
}

const createByURLTestCases = [
  {
    name: "正常系: URL から Jira インスタンスを生成できる",
    url:
      "https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=2&priority=3&summary=hello&description=world",
    want: new Jira("https://example.com", 1, 2, 3, "hello", "world", []),
  },
  {
    name: "正常系: description が空の場合は省略",
    url:
      "https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=2&priority=3&summary=hello",
    want: new Jira("https://example.com", 1, 2, 3, "hello", "", []),
  },
  {
    name: "正常系: labels は複数設定されうる",
    url:
      "https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=2&priority=3&summary=hello&labels=su&labels=shi",
    want: new Jira("https://example.com", 1, 2, 3, "hello", "", ["su", "shi"]),
  },
];

for (const tc of createByURLTestCases) {
  Deno.test(`Jira.createByURL() - ${tc.name}`, () => {
    const got = Jira.createByURL(tc.url);
    assertEquals(got, tc.want);
  });
}
