import * as path from 'path';
import * as fs from 'fs';
import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers'


const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, './graphql/schema.graphql'),
    {encoding:'utf8', flag:'r'}
  ),
  resolvers
});

server.listen({ port: process.env.PORT || 4001 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
