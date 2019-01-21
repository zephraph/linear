import { spawn } from "child_process";
import * as fs from "fs";
import { Config } from "../config";
import { trim } from "lodash";

const startEditor = (config: Config, file: string) => {
  return new Promise(resolve => {
    const editor = config.editor || "vim";
    // Parse command and args (e.g. "code --wait")
    const [cmd, ...args] = editor.split(" ");
    spawn(cmd, [...args, file], {
      stdio: "inherit"
    }).on("exit", resolve);
  });
};

/**
 * Start editor and return its content after user exists.
 */
export const readEditorContent = async (
  config: Config,
  template?: string
): Promise<string | undefined> => {
  const filename = `/tmp/linear-${process.pid}.md`;
  if (template) {
    fs.writeFileSync(filename, template);
  }
  await startEditor(config, filename);
  let content;
  try {
    content = fs.readFileSync(filename);
    return trimContent(content.toString());
  } catch (err) {
    return;
  }
};

/**
 * Remove markdown comments and trim content.
 */
const trimContent = (content: string) => {
  const rows = content.split("\n");
  const result = [];
  rows.forEach(row => {
    if (!row.startsWith("#")) {
      result.push(row);
    }
  });
  return trim(rows.join("\n"));
};
