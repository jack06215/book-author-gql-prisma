import { 
  CreateUserPayload, 
  Resolvers, 
  ResolversParentTypes, 
  UpdateUserPayload, 
  DeleteUserPayload, 
  User 
} from './generated/graphql';
import * as LD from 'lodash';
import { users } from './database';


export const resolvers: Resolvers = {
  Query: {
    helloworld: () => "Hello GraphQL in TypeScript",
    users: async(_, __, context): Promise<Array<ResolversParentTypes['User'] | null>> => {
      return await context.prisma.user.findMany();
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
    createUser: async (_, args, context): Promise<CreateUserPayload | null> => {
      const user = args.userInput;
      const newUser = await context.prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          age: user.age,
        },
      })
      console.log(newUser);
      return <ResolversParentTypes['CreateUserSuccess']>{ 
        __typename: 'CreateUserSuccess',
        user
      };
    },
    updateUser: async (_, args): Promise<UpdateUserPayload | null> => {
      const updatedUser = args.userInput;
      const updatedUserIndex = users.findIndex((user) => user.id === updatedUser.id);
      users[updatedUserIndex] = updatedUser;
      
      console.log(updatedUser);
      
      return <ResolversParentTypes['UpdateUserSuccess']>{
        __typename: 'UpdateUserSuccess',
        user: updatedUser
      };
    },
    deleteUser: async (_, args): Promise<DeleteUserPayload | null> => {
      const deletedUserId = args.id;
      const deletedUserIndex = users.findIndex((user) => user.id === deletedUserId);
      const deletedUser = users.find((_, i) => i === deletedUserIndex);
      users.splice(deletedUserIndex, 1);
      return <ResolversParentTypes['DeleteUserSuccess']>{
        __typename: 'DeleteUserSuccess',
        user: deletedUser
      };
    }
  }
}
