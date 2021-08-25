const users = [
  { id: 1, name: 'Jack Cho', age: 30, }, 
  { id: 2, name: 'John Smith', age: 999, },
  { id: 3, name: 'Jason', age: 20 },
]

export const resolvers = {
  Query: {
    helloworld: () => "Hello GraphQL in TypeScript",
    // 一般來說 resolvers 會有 4 個參數
    // parent: any, args: any, context: any, info: any
    users: async() => {
      return users;
    },
    user: async(_: any, args: any) => {
      const user = users.find(u => u.id === args.userInput.id);
      console.log(user);
      return user;
    }
  },
  Mutation: {
    createUser: async(_: any, args: any) => {
      const user = args.userInput;
      users.push(user);
      return user;
    },
    updateUser: async(_: any, args: any) => {
      const updatedUser = args.userInput;
      const updatedUserIndex = users.findIndex((user) => user.id === updatedUser.id);
      users[updatedUserIndex] = updatedUser;
      return updatedUser;
    },
    deleteUser: async(_: any, args: any) => {
      const deletedUserId = args.userConfig.id;
      const deletedUserIndex = users.findIndex((user) => user.id === deletedUserId);
      const deletedUser = users.find((_, i) => i === deletedUserIndex);
      users.splice(deletedUserIndex, 1);
      return deletedUser;
    },
  }
}
