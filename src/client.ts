import { Linear } from "@linear/sdk";
import ora = require("ora");
import { Issue } from "@linear/sdk/dist/generated-binding";
import chalk from "chalk";

export const createClient = (config: { token: string }) =>
  new LinearClient({ token: config.token });

class LinearClient {
  constructor(config: { token: string }) {
    this.token = config.token;
  }

  public get client() {
    return new Linear({ token: this.token });
  }

  public getIssue = async (issueId: string): Promise<Issue> => {
    let issue: Issue;
    try {
      const spinner = ora().start();
      issue = await this.client.query.issue({
        id: issueId
      });
      spinner.stop();
      return issue;
    } catch (err) {
      console.log(chalk.red("Unknown issue."));
      process.exit();
    }
    return issue!;
  };

  // -- Private instance

  private token: string;
}
