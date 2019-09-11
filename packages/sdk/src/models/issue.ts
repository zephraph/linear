// tslint:disable:no-invalid-this
import { gql } from "gql";
import { Linear } from "linear";
import {
  CreateIssueFromCliMutation,
  CreateIssueFromCliMutationVariables,
  UpdateIssueFromCliMutation,
  UpdateIssueFromCliMutationVariables,
} from "./issue.generated";

type IssueSelection =
  | {
      /** UUID of the issue */
      id: string;
    }
  | {
      /**
       * In the format of `ABC-123`, the issue key is made up of the team key plus the issue number.
       * This can be found in the URL or in the issue view.
       **/
      key: string;
    };

export const selectIssue = async (client: Linear, selection: IssueSelection) => {
  // Find team
};

export const create = async (client: Linear, issueInput: CreateIssueFromCliMutationVariables) =>
  client.request<CreateIssueFromCliMutation, CreateIssueFromCliMutationVariables>(
    gql`
      mutation CreateIssueFromCLI($title: String!, $teamId: String!, $labelIds: [String!]) {
        issueCreate(input: { title: $title, teamId: $teamId, labelIds: $labelIds }) {
          issue {
            id
            number
            team {
              key
            }
          }
        }
      }
    `,
    issueInput
  );

export const update = async (client: Linear, issueInput: UpdateIssueFromCliMutationVariables) =>
  client.request<UpdateIssueFromCliMutation, UpdateIssueFromCliMutationVariables>(
    gql`
      mutation UpdateIssueFromCLI($id: String!, $title: String, $description: String) {
        issueUpdate(id: $id, input: { title: $title, description: $description }) {
          issue {
            id
            number
            team {
              key
            }
          }
        }
      }
    `,
    issueInput
  );

// type LabelInput = { name: string }
// export const addLabel = async (client: Linear, )

export const issue = (client: Linear) => ({
  create: create.bind(null, client),
  // get(issue: IssueSelection) { }
});
