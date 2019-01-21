import { trim } from "lodash";
import * as inquirer from "inquirer";
import ora from "ora";
import { readEditorContent } from "../editor/editor";
import { Config } from "../config";
import { createClient } from "../client";
import { printError } from "../messages";

const issueTemplate = (
  title: string,
  project: string
) => `# Please enter the issue description in markdown.
# Lines starting with '#' will be ignored.
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
  // Issue title
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
    printError("No title, aborting...");
    process.exit();
  }

  // Description
  let description =
    args.description ||
    (!args.skipInput &&
      (await readEditorContent(
        config,
        issueTemplate(title, `[${config.projectKey}] ${config.projectName}`)
      )));
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

  // Create issue
  const spinner = ora("Creating issue...").start();
  try {
    const linear = createClient(config);
    const issueData = await linear.client.mutation.issueCreate(
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
    printError("Unable to create issue.");
  }
};
