import { HttpLink } from "apollo-link-http";
import { BindingInstance } from "./generated-binding";
export interface LinearLinkOptions {
    token: string;
}
export declare class LinearLink extends HttpLink {
    constructor(options: LinearLinkOptions);
}
export interface BindingConstructor<T> {
    new (options: LinearLinkOptions): T;
}
export declare const Linear: BindingConstructor<BindingInstance>;
//# sourceMappingURL=index.d.ts.map