import { gql } from "gql";
import { Linear } from "linear";
import { TeamKeysFromCliQuery } from "./team.generated";

/**
 * Gets the UUID of a team from the team's key (like `LNR`)
 */
export const getIdFromKey = async (client: Linear, key: string) => {
  const { teams } = await client.request<TeamKeysFromCliQuery>(gql`
    query teamKeysFromCLI {
      teams {
        id
        key
      }
    }
  `);
  const team = teams.find(t => t.key === key);
  return team && team.id;
};

// export const get = async (client: Linear, teamInput) =>
//   client.request(gql`
//     query teamFromCLI {

//     }
//   `);
