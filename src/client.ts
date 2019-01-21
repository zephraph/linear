import { Linear } from "@linear/sdk";

export const createClient = (config: { token: string }) =>
  new Linear({ token: config.token });
