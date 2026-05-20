import { assertEquals } from "@std/assert";
import { generateURL } from "../public/utils.js";

const testCases = [
  {
    name: "正常系: labels 以外のすべてが揃っている場合は生成できる",
    jira: {
      baseURL: "https://example.com",
      projectID: "1",
      issueType: "2",
      priority: "3",
      summary: "hello",
      description: "world",
      labels: [],
    },
    want:
      "https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=2&priority=3&summary=hello&description=world",
  },
  {
    name: "正常系: description が空の場合は省略",
    jira: {
      baseURL: "https://example.com",
      projectID: "1",
      issueType: "2",
      priority: "3",
      summary: "hello",
      description: "",
      labels: [],
    },
    want:
      "https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=2&priority=3&summary=hello",
  },
  {
    name: "正常系: labels は複数設定されうる",
    jira: {
      baseURL: "https://example.com",
      projectID: "1",
      issueType: "2",
      priority: "3",
      summary: "hello",
      description: "",
      labels: ["su", "shi"],
    },
    want:
      "https://example.com/secure/CreateIssueDetails!init.jspa?pid=1&issuetype=2&priority=3&summary=hello&labels=su&labels=shi",
  },
];

for (const tc of testCases) {
  Deno.test(`generateURL() - ${tc.name}`, () => {
    const got = generateURL(tc.jira);
    assertEquals(got, tc.want);
  });
}
