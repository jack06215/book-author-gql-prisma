import { 
  CreateUserPayload, 
  Resolvers, 
  ResolversParentTypes, 
  UpdateUserPayload, 
  DeleteUserPayload, 
  User 
} from './generated/graphql';
import { users } from './database';


export const resolvers: Resolvers = {
  Query: {
    helloworld: () => "Hello GraphQL in TypeScript",
    users: async(_, args, context): Promise<Array<ResolversParentTypes['User'] | null>> => {
      const ids = args.ids;
      return await context.prisma.user.findMany({
        where: {
          id: { 
            in: ids
          }
        }
      });
    },
    user: async(_, args, context): Promise<ResolversParentTypes['User'] | null> => {
      const user = await context.prisma.user.findUnique(
        { 
          where: { 
            id: args.id 
          } 
      });
      if (user !== null) {
        console.log(user);
        return <User>{ ...user };
      } 
      else {
        return null;
      }
    }
  },
  Mutation: {
    createUser: async (_, args, context): Promise<CreateUserPayload> => {
      const newUser = await context.prisma.user.create({
        data: {
          name: args.name,
          age: args.age,
        },
      })
      console.log(newUser);
      return <ResolversParentTypes['CreateUserSuccess']>{ 
        __typename: 'CreateUserSuccess',
        newUser
      };
    },
    updateUser: async (_, args, context): Promise<UpdateUserPayload | null> => {
      await context.prisma.user.update({
        where: {
          id: args.userInput.id
        },
        data: {
          name: args.userInput.name,
          age: args.userInput.age
        }
      }).then(
        updatedUser =>{
          console.log(updatedUser);
          return <ResolversParentTypes['UpdateUserSuccess']>{
            __typename: 'UpdateUserSuccess',
            user: updatedUser
          }
        }
      );
      return null;
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
