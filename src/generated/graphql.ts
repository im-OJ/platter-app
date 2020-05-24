import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";

export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type File = {
  __typename?: "File";
  id: Scalars["String"];
};

export type FirebaseUser = {
  __typename?: "FirebaseUser";
  id: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  signUp?: Maybe<FirebaseUser>;
  updateUser?: Maybe<User>;
  newSample?: Maybe<Sample>;
};

export type MutationSignUpArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  data?: Maybe<UpdateUser>;
};

export type MutationNewSampleArgs = {
  sample: SampleInput;
};

export type Query = {
  __typename?: "Query";
  hello?: Maybe<Scalars["String"]>;
  me?: Maybe<User>;
  getSamples?: Maybe<Scalars["Boolean"]>;
  searchSamples?: Maybe<Array<Sample>>;
};

export type QueryGetSamplesArgs = {
  ids: Array<Scalars["String"]>;
};

export type QuerySearchSamplesArgs = {
  tags?: Maybe<Array<Scalars["String"]>>;
};

export type Sample = {
  __typename?: "Sample";
  name?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  tagLink?: Maybe<Array<Maybe<TagText>>>;
  downloads: Scalars["Int"];
  user: UserLink;
  url?: Maybe<Scalars["String"]>;
};

export type SampleInput = {
  tagText?: Maybe<Array<Scalars["String"]>>;
  url: Scalars["String"];
  name: Scalars["String"];
};

export type Tag = {
  __typename?: "Tag";
  title: Scalars["String"];
  samples?: Maybe<Array<Sample>>;
};

export type TagText = {
  __typename?: "TagText";
  name: Scalars["String"];
};

export type Token = {
  __typename?: "Token";
  token?: Maybe<Scalars["String"]>;
};

export type UpdateUser = {
  username?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  username?: Maybe<Scalars["String"]>;
  hasFullAccount: Scalars["Boolean"];
  samples?: Maybe<Array<Sample>>;
};

export type UserLink = {
  __typename?: "UserLink";
  id: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars["String"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CacheControlScope: CacheControlScope;
  File: ResolverTypeWrapper<File>;
  FirebaseUser: ResolverTypeWrapper<FirebaseUser>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Sample: ResolverTypeWrapper<Sample>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  SampleInput: SampleInput;
  Tag: ResolverTypeWrapper<Tag>;
  TagText: ResolverTypeWrapper<TagText>;
  Token: ResolverTypeWrapper<Token>;
  UpdateUser: UpdateUser;
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
  User: ResolverTypeWrapper<User>;
  UserLink: ResolverTypeWrapper<UserLink>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars["String"];
  Boolean: Scalars["Boolean"];
  CacheControlScope: CacheControlScope;
  File: File;
  FirebaseUser: FirebaseUser;
  Mutation: {};
  Query: {};
  Sample: Sample;
  Int: Scalars["Int"];
  SampleInput: SampleInput;
  Tag: Tag;
  TagText: TagText;
  Token: Token;
  UpdateUser: UpdateUser;
  Upload: Scalars["Upload"];
  User: User;
  UserLink: UserLink;
};

export type CacheControlDirectiveArgs = {
  maxAge?: Maybe<Scalars["Int"]>;
  scope?: Maybe<CacheControlScope>;
};

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = CacheControlDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type FileResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["File"] = ResolversParentTypes["File"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type FirebaseUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FirebaseUser"] = ResolversParentTypes["FirebaseUser"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  signUp?: Resolver<
    Maybe<ResolversTypes["FirebaseUser"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "email" | "password">
  >;
  updateUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, never>
  >;
  newSample?: Resolver<
    Maybe<ResolversTypes["Sample"]>,
    ParentType,
    ContextType,
    RequireFields<MutationNewSampleArgs, "sample">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  hello?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  getSamples?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetSamplesArgs, "ids">
  >;
  searchSamples?: Resolver<
    Maybe<Array<ResolversTypes["Sample"]>>,
    ParentType,
    ContextType,
    RequireFields<QuerySearchSamplesArgs, never>
  >;
};

export type SampleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Sample"] = ResolversParentTypes["Sample"]
> = {
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tagLink?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["TagText"]>>>,
    ParentType,
    ContextType
  >;
  downloads?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["UserLink"], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TagResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Tag"] = ResolversParentTypes["Tag"]
> = {
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  samples?: Resolver<
    Maybe<Array<ResolversTypes["Sample"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TagTextResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["TagText"] = ResolversParentTypes["TagText"]
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TokenResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Token"] = ResolversParentTypes["Token"]
> = {
  token?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  hasFullAccount?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  samples?: Resolver<
    Maybe<Array<ResolversTypes["Sample"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type UserLinkResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserLink"] = ResolversParentTypes["UserLink"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  File?: FileResolvers<ContextType>;
  FirebaseUser?: FirebaseUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sample?: SampleResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  TagText?: TagTextResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserLink?: UserLinkResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>;
