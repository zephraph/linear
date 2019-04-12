var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { GraphQLError } from "graphql";
import { makeRemoteExecutableSchema } from "graphql-tools";
import { Binding } from "./generated-binding";
import linearSchema from "./linearSchema";
var LinearLink = /** @class */ (function (_super) {
    __extends(LinearLink, _super);
    function LinearLink(options) {
        var _this = this;
        if (!options.token) {
            throw new Error("No Linear developer key provided. Create one here: https://linear.app/settings");
        }
        _this = _super.call(this, {
            uri: "https://api.linear.app/graphql",
            headers: { Authorization: options.token }
        }) || this;
        return _this;
    }
    return LinearLink;
}(HttpLink));
export { LinearLink };
// https://github.com/graphql-binding/graphql-binding/issues/173#issuecomment-446366548
var errorLink = onError(function (args) {
    if (args.graphQLErrors && args.graphQLErrors.length === 1) {
        args.response.errors = args.graphQLErrors.concat(new GraphQLError(""));
    }
});
var LinearBinding = /** @class */ (function (_super) {
    __extends(LinearBinding, _super);
    function LinearBinding(options) {
        var _this = this;
        var schema = makeRemoteExecutableSchema({
            schema: linearSchema,
            link: errorLink.concat(new LinearLink(options))
        });
        _this = _super.call(this, { schema: schema }) || this;
        return _this;
    }
    return LinearBinding;
}(Binding));
export var Linear = LinearBinding;
//# sourceMappingURL=index.js.map