import * as inquirer from "inquirer";
import { createClient } from "../client";
import ora from "ora";
import { CONFIG_FILE } from "../constants";
import chalk from "chalk";
import { saveConfig, deleteConfig } from "../config";

export const login = async () => {
  console.log(
    "Login required. Please create and developer key at https://linear.app/settings"
  );

  const input = await inquirer.prompt<{ apiKey: string }>([
    {
      type: "input",
      name: "apiKey",
      message: "Enter your developer key:"
    }
  ]);

  if (!input.apiKey) {
    process.exit();
  }

  const linear = createClient({ token: input.apiKey });
  const spinner = ora().start();
  const projects = await linear.query.projects();
  spinner.stop();

  let projectId: string;
  if (projects.length === 1) {
    projectId = projects[0].id;
  } else {
    const projectInput = await inquirer.prompt<{
      project: string;
    }>([
      {
        type: "list",
        name: "project",
        message: "Default project:",
        choices: projects.map(project => ({
          name: `[${project.key}] ${project.name}`,
          value: project.id,
          short: project.key
        }))
      }
    ]);
    projectId = projectInput.project;
  }

  const editorInput = await inquirer.prompt<{
    editor: string;
  }>([
    {
      type: "input",
      name: "editor",
      message: "Editor:",
      default: process.env.EDITOR || process.env.VISUAL || "vim"
    }
  ]);

  saveConfig({
    token: input.apiKey,
    projectId,
    editor: editorInput.editor
  });
};

export const logout = async () => {
  deleteConfig();
};
