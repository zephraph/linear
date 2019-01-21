#! /usr/bin/env node
import program from "commander";
import { openIssue } from "./commands/openIssue";
import { loadConfig } from "./config";
import { login, logout } from "./commands/auth";
import { newIssue, NewIssueArgs } from "./commands/newIssue";
import { CommentIssueArgs, issueComment } from "./commands/issueComment";

(async () => {
  program.version(process.env.npm_package_version || "");

  // Unauthenticated commands

  program
    .command("login")
    .description("Login to Linear")
    .action(login);

  // Authenticated commands

  const config = loadConfig();
  if (!config) {
    await login;
  } else {
    program
      .command("logout")
      .description("Logout session")
      .action(logout);

    program
      .command("issue [title]")
      .alias("i")
      .option("--description <description>", "Issue description")
      .option("--skipInput", "Skip user input (title required)")
      .description("Create a new issue")
      .action((title: string, args: NewIssueArgs) =>
        newIssue(config!, title, args)
      );

    program
      .command("comment <issueId>")
      .alias("c")
      .option("--comment <comment>", "Comment")
      .description(
        "Comment on issue. If `--comment` is omitted, interactive comment composer is opened"
      )
      .action((issueId: string, args: CommentIssueArgs) =>
        issueComment(config!, issueId, args)
      );

    program
      .command("open [issue ID]")
      .alias("o")
      .description("Opens issue in the browser")
      .action(openIssue);
  }

  program.parse(process.argv);
})();
