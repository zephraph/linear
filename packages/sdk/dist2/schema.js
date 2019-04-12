import { makeExecutableSchema } from "graphql-tools";
import linearSchema from "./linearSchema";
var schema = makeExecutableSchema({
    typeDefs: linearSchema
});
export default schema;
//# sourceMappingURL=schema.js.map