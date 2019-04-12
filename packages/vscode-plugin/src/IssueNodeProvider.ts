import * as vscode from "vscode";
import { Linear } from "./sdk/index";

export class IssuesNodeProvider implements vscode.TreeDataProvider<Issue> {
  public readonly onDidChangeTreeData: vscode.Event<Issue | undefined> = this
    ._onDidChangeTreeData.event;

  public constructor() {
    this.linear = new Linear({
      token: ""
    });
  }

  public refresh(): void {
    this._onDidChangeTreeData.fire();
    const projects = this.linear.query.projects();
  }

  public getTreeItem(element: Issue): vscode.TreeItem {
    return element;
  }

  public getChildren(element?: Issue): Thenable<Issue[]> {
    return Promise.resolve([
      new Issue("LIN-258", "This is an description"),
      new Issue("LIN-259", "This is an description"),
      new Issue("LIN-260", "This is an description")
    ]);
  }
  private _onDidChangeTreeData: vscode.EventEmitter<
    Issue | undefined
  > = new vscode.EventEmitter<Issue | undefined>();

  private linear: Linear;
}

export class Issue extends vscode.TreeItem {
  public constructor(public readonly id: string, private title: string) {
    super(id, vscode.TreeItemCollapsibleState.None);
  }

  public get tooltip(): string {
    return `${this.label} - ${this.title}`;
  }

  public get description(): string {
    return this.title;
  }
}
