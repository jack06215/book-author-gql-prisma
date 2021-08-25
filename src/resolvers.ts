import { CreateUserPayload, Resolvers, ResolversParentTypes, UpdateUserPayload, User } from './generated/graphql';
import * as LD from 'lodash';

const users = [
  { id: 1, name: 'Jack Cho', age: 30, }, 
  { id: 2, name: 'John Smith', age: 999, },
  { id: 3, name: 'Jason', age: 20 },
]

export const resolvers: Resolvers = {
  Query: {
    helloworld: () => "Hello GraphQL in TypeScript",
    users: async() => {
      return users;
    },
    user: async(_, args): Promise<ResolversParentTypes['User'] | null> => {
      const user = LD.find(users, { id: args.id });
      if (user !== null) {
        console.log(user);
        return <User>{
          ...user
        };
      } 
      else {
        return null;
      }
    }
  },
  Mutation: {
    createUser: async (_, args): Promise<CreateUserPayload | null> => {
      const user = args.userInput;
      users.push(user);
      return <ResolversParentTypes['CreateUserSuccess']>{ 
        __typename: 'CreateUserSuccess',
        user
      };
    },
    updateUser: async (_, args): Promise<UpdateUserPayload | null> => {
      const updatedUser = args.userInput;
      const updatedUserIndex = users.findIndex((user) => user.id === updatedUser.id);
      users[updatedUserIndex] = updatedUser;
      console.log(users[updatedUserIndex]);
      return <ResolversParentTypes['UpdateUserSuccess']>{
        __typename: 'UpdateUserSuccess',
        user: updatedUser
      };
    }
    // deleteUser: async(_: any, args: any) => {
    //   const deletedUserId = args.userConfig.id;
    //   const deletedUserIndex = users.findIndex((user) => user.id === deletedUserId);
    //   const deletedUser = users.find((_, i) => i === deletedUserIndex);
    //   users.splice(deletedUserIndex, 1);
    //   return deletedUser;
    // },
  }
}
