import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUserPayload = CreateUserSuccess | ValidationError;

export type CreateUserSuccess = {
  __typename?: 'CreateUserSuccess';
  user?: Maybe<User>;
};

export type DeleteUserPayload = DeleteUserSuccess | ValidationError;

export type DeleteUserSuccess = {
  __typename?: 'DeleteUserSuccess';
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<CreateUserPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationUpdateUserArgs = {
  userInput: UserInput;
};

export type Query = {
  __typename?: 'Query';
  helloworld?: Maybe<Scalars['String']>;
  users: Array<Maybe<User>>;
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type UpdateUserPayload = UpdateUserSuccess | ValidationError;

export type UpdateUserSuccess = {
  __typename?: 'UpdateUserSuccess';
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  age: Scalars['Int'];
};

export type UserInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  age: Scalars['Int'];
};

export type ValidationError = {
  __typename?: 'ValidationError';
  message?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CreateUserPayload: ResolversTypes['CreateUserSuccess'] | ResolversTypes['ValidationError'];
  CreateUserSuccess: ResolverTypeWrapper<CreateUserSuccess>;
  DeleteUserPayload: ResolversTypes['DeleteUserSuccess'] | ResolversTypes['ValidationError'];
  DeleteUserSuccess: ResolverTypeWrapper<DeleteUserSuccess>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  UpdateUserPayload: ResolversTypes['UpdateUserSuccess'] | ResolversTypes['ValidationError'];
  UpdateUserSuccess: ResolverTypeWrapper<UpdateUserSuccess>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  ValidationError: ResolverTypeWrapper<ValidationError>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CreateUserPayload: ResolversParentTypes['CreateUserSuccess'] | ResolversParentTypes['ValidationError'];
  CreateUserSuccess: CreateUserSuccess;
  DeleteUserPayload: ResolversParentTypes['DeleteUserSuccess'] | ResolversParentTypes['ValidationError'];
  DeleteUserSuccess: DeleteUserSuccess;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Int: Scalars['Int'];
  UpdateUserPayload: ResolversParentTypes['UpdateUserSuccess'] | ResolversParentTypes['ValidationError'];
  UpdateUserSuccess: UpdateUserSuccess;
  User: User;
  UserInput: UserInput;
  ValidationError: ValidationError;
  Boolean: Scalars['Boolean'];
};

export type CreateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserPayload'] = ResolversParentTypes['CreateUserPayload']> = {
  __resolveType: TypeResolveFn<'CreateUserSuccess' | 'ValidationError', ParentType, ContextType>;
};

export type CreateUserSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserSuccess'] = ResolversParentTypes['CreateUserSuccess']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserPayload'] = ResolversParentTypes['DeleteUserPayload']> = {
  __resolveType: TypeResolveFn<'DeleteUserSuccess' | 'ValidationError', ParentType, ContextType>;
};

export type DeleteUserSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserSuccess'] = ResolversParentTypes['DeleteUserSuccess']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserPayload']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UpdateUserPayload']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'userInput'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  helloworld?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type UpdateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserPayload'] = ResolversParentTypes['UpdateUserPayload']> = {
  __resolveType: TypeResolveFn<'UpdateUserSuccess' | 'ValidationError', ParentType, ContextType>;
};

export type UpdateUserSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserSuccess'] = ResolversParentTypes['UpdateUserSuccess']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  age?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidationError'] = ResolversParentTypes['ValidationError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CreateUserPayload?: CreateUserPayloadResolvers<ContextType>;
  CreateUserSuccess?: CreateUserSuccessResolvers<ContextType>;
  DeleteUserPayload?: DeleteUserPayloadResolvers<ContextType>;
  DeleteUserSuccess?: DeleteUserSuccessResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UpdateUserPayload?: UpdateUserPayloadResolvers<ContextType>;
  UpdateUserSuccess?: UpdateUserSuccessResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
};

