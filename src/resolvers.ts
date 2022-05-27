import { isError } from "lodash";
import { Resolvers } from "./generated/graphql";

import * as gqlTypes from "./generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    helloworld: (): string => "Hello GraphQL in TypeScript",
    users: async (_, args, context): Promise<Array<gqlTypes.User | null>> => {
      const ids = args.ids;
      return context.prisma.user
        .findMany({
          where: {
            id: {
              in: ids,
            },
          },
        })
        .then((users) => users.map((user) => (isError(user) ? null : user)));
    },
    user: async (_, args, context): Promise<gqlTypes.User | null> => {
      return context.prisma.user
        .findUnique({
          where: {
            id: args.id,
          },
        })
        .then((user) => (isError(user) ? null : user));
    },
  },
  Mutation: {
    createUser: async (
      _,
      args,
      context
    ): Promise<gqlTypes.CreateUserPayload> => {
      const user = await context.prisma.user.create({
        data: {
          name: args.name,
          age: args.age,
          createdAt: new Date(),
        },
      });
      console.log(user);
      return <gqlTypes.CreateUserSuccess>{
        __typename: "CreateUserSuccess",
        user,
      };
    },
    updateUser: async (
      _,
      args,
      context
    ): Promise<gqlTypes.UpdateUserPayload | null> => {
      await context.prisma.user
        .update({
          where: {
            id: args.userInput.id,
          },
          data: {
            name: args.userInput.name,
            age: args.userInput.age,
            updatedAt: new Date(),
          },
        })
        .then((updatedUser) => {
          console.log(updatedUser);
          return <gqlTypes.UpdateUserSuccess>{
            __typename: "UpdateUserSuccess",
            user: updatedUser,
          };
        });
      return null;
    },
    deleteUser: async (
      _,
      args,
      context
    ): Promise<gqlTypes.DeleteUserPayload | null> => {
      const deletedUser = await context.prisma.user.delete({
        where: {
          id: args.id,
        },
      });
      return <gqlTypes.DeleteUserSuccess>{
        __typename: "DeleteUserSuccess",
        user: deletedUser,
      };
    },
  },
};
