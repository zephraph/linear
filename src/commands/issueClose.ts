import { Config } from "../config";
import { readEditorContent } from "../editor/editor";
import ora = require("ora");
import { createClient } from "../client";
import { Issue } from "@linear/sdk/dist/generated-binding";
import { printError, printSuccess } from "../messages";

/**
 * Mark issue as done.
 */
export const issueClose = async (config: Config, issueId: string) => {
  const linear = createClient(config);

  // First, fetch the issue
  let issue = await linear.getIssue(issueId);

  // Change status to first completed state.
  try {
    const spinner = ora().start();
    await linear.client.mutation.issueClose(
      {
        id: issue.id
      },
      "{ issue { id } }"
    );
    spinner.stop();
    printSuccess(`${issueId} marked as done.`);
  } catch (err) {
    printError("Unable to change status.");
    process.exit();
  }
};
