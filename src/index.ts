#! /usr/bin/env node
import program from "commander";
import { openIssue } from "./commands/openIssue";
import { loadConfig } from "./config";
import { login, logout } from "./commands/auth";
import { newIssue, NewIssueArgs } from "./commands/newIssue";

(async () => {
  program.version(process.env.npm_package_version || "");

  program
    .command("login")
    .description("Login to Linear")
    .action(login);

  // Next up authenticated commands

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
      .command("open [issue ID]")
      .alias("o")
      .description("Opens issue in the browser")
      .action(openIssue);
  }

  program.parse(process.argv);
})();
