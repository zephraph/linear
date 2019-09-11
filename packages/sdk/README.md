# @linear/sdk

Node library for querying Linear's API and creating new issues and tasks. It's a light wrapper around Linear's GraphQL API and ships with Typescript types out of the box.

## Usage

```
yarn install @linear/sdk
```

```js
import { Linear, gql } from "@linear/sdk";

const linear = new Linear({
  apiKey: "<your developer key>",
});

// Access the graphql api
linear
  .request(
    `
  query {
    teams {
      name
    }
  }`
  )
  .then(teams => console.log(teams));
```

TODO: Add more documentation

## Documentation

- **[API reference](https://github.com/linearapp/linear-node-sdk/blob/master/schema.md)**

## License

[MIT](https://github.com/linearapp/linear-node-sdk/blob/master/LICENSE.md)
