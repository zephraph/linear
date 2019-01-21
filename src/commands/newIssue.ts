import { trim } from "lodash";
import * as inquirer from "inquirer";
import ora from "ora";
import { readEditorContent } from "../editor/editor";
import { Config } from "../config";
import { createClient } from "../client";

const issueTemplate = (
  title: string,
  project: string
) => `# Please enter the issue summary and description. Lines starting with '#' will
# be ignored, and an empty message aborts the issue creation.
#
# Issue details:
#     title:   ${title}
#     project: ${project}

`;

export interface NewIssueArgs {
  description?: string;
  skipInput?: boolean | string;
}

interface TitleInput {
  title: string;
}

export const newIssue = async (
  config: Config,
  title: string,
  args: NewIssueArgs
) => {
  if (!title) {
    const input = await inquirer.prompt<TitleInput>([
      {
        name: "title",
        message: "Issue title:"
      }
    ]);
    title = input.title;
  }

  if (!title || trim(title).length === 0) {
    console.log("No title, aborting...");
    process.exit();
  }

  // TODO: fetch project and title, or pull from cache

  let description =
    args.description ||
    (!args.skipInput &&
      (await readEditorContent(config, issueTemplate(title, "[LIN] Linear"))));
  description = description ? description : undefined;

  // Confirm
  if (args.skipInput === undefined) {
    const input = await inquirer.prompt<{ confirm: boolean }>([
      {
        type: "confirm",
        name: "confirm",
        message: "Create issue?",
        default: true
      }
    ]);
    if (!input.confirm) {
      process.exit();
    }
  }

  const spinner = ora("Creating issue...").start();
  try {
    const linear = createClient(config);
    const issueData = await linear.mutation.issueCreate(
      {
        input: {
          title,
          description,
          boardOrder: 0,
          projectId: ""
        }
      },
      "{ issue { id number project { key } } }"
    );
    spinner.stop();
    console.log(`Issue created:`, { issueData });
  } catch (err) {
    spinner.stop();
    console.error(err.message);
  }
};
