import { isError } from 'lodash';
import { 
  CreateUserPayload, 
  Resolvers, 
  ResolversParentTypes, 
  UpdateUserPayload, 
  DeleteUserPayload, 
} from './generated/graphql';

export const resolvers: Resolvers = {
  Query: {
    helloworld: () => "Hello GraphQL in TypeScript",
    users: async(_, args, context): Promise<Array<ResolversParentTypes['User'] | null>> => {
      const ids = args.ids;
      return context.prisma.user.findMany({
        where: {
          id: {
            in: ids
          }
        }
      }).then(users => (
        users.map( user => (isError(user) ? null : user) )
      ));
    },
    user: async(_, args, context): Promise<ResolversParentTypes['User'] | null> => {
      return context.prisma.user.findUnique({
        where: {
          id: args.id
        }
      }).then(
        user => isError(user) ? null : user
      );
    }
  },
  Mutation: {
    createUser: async (_, args, context): Promise<CreateUserPayload> => {
      const newUser = await context.prisma.user.create({
        data: {
          name: args.name,
          age: args.age,
          createdAt: new Date(),
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
          age: args.userInput.age,
          updatedAt: new Date(),
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
    deleteUser: async (_, args, context): Promise<DeleteUserPayload | null> => {
      const deletedUser = await context.prisma.user.delete({
        where: {
          id: args.id
        }
      });
      return <ResolversParentTypes['DeleteUserSuccess']>{
        __typename: 'DeleteUserSuccess',
        user: deletedUser
      };
    }
  }
}
