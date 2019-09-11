import * as Types from '../schema';

export type CreateIssueFromCliMutationVariables = {
  title: Types.Scalars['String'],
  teamId: Types.Scalars['String'],
  labelIds?: Types.Maybe<Array<Types.Scalars['String']>>
};


export type CreateIssueFromCliMutation = (
  { __typename?: 'Mutation' }
  & { issueCreate: (
    { __typename?: 'IssuePayload' }
    & { issue: Types.Maybe<(
      { __typename?: 'Issue' }
      & Pick<Types.Issue, 'id' | 'number'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Types.Team, 'key'>
      ) }
    )> }
  ) }
);

export type UpdateIssueFromCliMutationVariables = {
  id: Types.Scalars['String'],
  title?: Types.Maybe<Types.Scalars['String']>,
  description?: Types.Maybe<Types.Scalars['String']>
};


export type UpdateIssueFromCliMutation = (
  { __typename?: 'Mutation' }
  & { issueUpdate: (
    { __typename?: 'IssuePayload' }
    & { issue: Types.Maybe<(
      { __typename?: 'Issue' }
      & Pick<Types.Issue, 'id' | 'number'>
      & { team: (
        { __typename?: 'Team' }
        & Pick<Types.Team, 'key'>
      ) }
    )> }
  ) }
);
