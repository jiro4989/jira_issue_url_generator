import { assertEquals } from "@std/assert";
import Jira from "../public/jira.js";

const testCases = [
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

for (const tc of testCases) {
  Deno.test(`generateURL() - ${tc.name}`, () => {
    const got = tc.jira.generateURL();
    assertEquals(got, tc.want);
  });
}
