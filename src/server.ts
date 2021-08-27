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
  await prisma.user.deleteMany();
  for (let i = 0; i < users.length; i++) {
    await prisma.user.create({
      data:{
        id: users[i].id,
        name: users[i].name,
        age: users[i].age
      }
    });
  }

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
