import * as Types from '../schema';

export type TeamKeysFromCliQueryVariables = {};


export type TeamKeysFromCliQuery = (
  { __typename?: 'Query' }
  & { teams: Array<(
    { __typename?: 'Team' }
    & Pick<Types.Team, 'id' | 'key'>
  )> }
);
