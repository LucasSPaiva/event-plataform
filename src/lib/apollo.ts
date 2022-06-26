import { ApolloClient, InMemoryCache  } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4vcoxf11e5701un0zlhcwd3/master',
  cache: new InMemoryCache()
});