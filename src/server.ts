import * as path from 'path';
import * as fs from 'fs';
import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers'
import { PrismaClient } from '@prisma/client';
import { users } from './database';

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

prisma.$on("query", async (e) => {
  console.log(`${e.query} ${e.params}`)
});

async function main(){
  // Setup some data
  await prisma.user.deleteMany();
  users.map(
    async user => {
      await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          age: user.age,
          createdAt: new Date(),
        }
      });
    }
  );

  const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, './graphql/schema.graphql'),
      {encoding:'utf8', flag:'r'}
    ),
    resolvers, 
    context: () => {
      return {
        prisma
      };
    },
  });

  server.listen({ port: process.env.PORT || 4001 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main().catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
