/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Account = {
  __typename?: 'Account';
  _count: AccountCount;
  avatarUrl?: Maybe<Scalars['String']>;
  connections?: Maybe<Array<OAuthConnection>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  roles?: Maybe<Array<AccountRole>>;
  sessions?: Maybe<Array<AccountSession>>;
  status: AccountStatus;
  updatedAt: Scalars['DateTime'];
};

export type AccountCount = {
  __typename?: 'AccountCount';
  connections: Scalars['Int'];
  sessions: Scalars['Int'];
};

export enum AccountRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type AccountSession = {
  __typename?: 'AccountSession';
  account: Account;
  accountId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  id: Scalars['Int'];
  ipAddr: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userAgent?: Maybe<Scalars['String']>;
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Inactive = 'INACTIVE'
}

export type GenerateEmailCodeResponse = {
  __typename?: 'GenerateEmailCodeResponse';
  expiresAt: Scalars['DateTime'];
  result: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  echo: Scalars['String'];
  generateEmailCode: GenerateEmailCodeResponse;
  getAccessToken: Scalars['String'];
  getCodeByAuth0: Scalars['String'];
  getCodeByUaepass: Scalars['String'];
  logout: Scalars['Boolean'];
  updateAccount: Account;
};


export type MutationEchoArgs = {
  text: Scalars['String'];
};


export type MutationGenerateEmailCodeArgs = {
  email: Scalars['String'];
};


export type MutationGetAccessTokenArgs = {
  code: Scalars['String'];
};


export type MutationGetCodeByAuth0Args = {
  code: Scalars['String'];
  redirectUri: Scalars['String'];
};


export type MutationGetCodeByUaepassArgs = {
  code: Scalars['String'];
  redirectUri: Scalars['String'];
};


export type MutationLogoutArgs = {
  sessionIds: Array<Scalars['Float']>;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};

export type OAuthCode = {
  __typename?: 'OAuthCode';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  id: Scalars['Int'];
  oAuthConnection: OAuthConnection;
  oAuthConnectionId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type OAuthConnection = {
  __typename?: 'OAuthConnection';
  _count: OAuthConnectionCount;
  account: Account;
  accountId: Scalars['Int'];
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  oAuthCodes?: Maybe<Array<OAuthCode>>;
  provider: OAuthProvider;
  uid: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type OAuthConnectionCount = {
  __typename?: 'OAuthConnectionCount';
  oAuthCodes: Scalars['Int'];
};

export enum OAuthProvider {
  Auth0 = 'AUTH0',
  Uaepass = 'UAEPASS'
}

export type Query = {
  __typename?: 'Query';
  currentSession: AccountSession;
  debug: Scalars['JSON'];
  echo: Scalars['String'];
  generateUrlAuth0: Scalars['String'];
  generateUrlUaepass: Scalars['String'];
  whoami: Account;
};


export type QueryEchoArgs = {
  text: Scalars['String'];
};


export type QueryGenerateUrlAuth0Args = {
  redirectUri: Scalars['String'];
};


export type QueryGenerateUrlUaepassArgs = {
  redirectUri: Scalars['String'];
};

export type UpdateAccountInput = {
  avatarUrl: Scalars['String'];
};

export type GetSsoCodeMutationVariables = Exact<{
  code: Scalars['String'];
  redirectUri: Scalars['String'];
}>;


export type GetSsoCodeMutation = { __typename?: 'Mutation', getCodeByUaepass: string };

export type GetAccessTokenMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GetAccessTokenMutation = { __typename?: 'Mutation', getAccessToken: string };


export const GetSsoCodeDocument = gql`
    mutation GetSSOCode($code: String!, $redirectUri: String!) {
  getCodeByUaepass(code: $code, redirectUri: $redirectUri)
}
    `;
export type GetSsoCodeMutationFn = Apollo.MutationFunction<GetSsoCodeMutation, GetSsoCodeMutationVariables>;

/**
 * __useGetSsoCodeMutation__
 *
 * To run a mutation, you first call `useGetSsoCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetSsoCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getSsoCodeMutation, { data, loading, error }] = useGetSsoCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *      redirectUri: // value for 'redirectUri'
 *   },
 * });
 */
export function useGetSsoCodeMutation(baseOptions?: Apollo.MutationHookOptions<GetSsoCodeMutation, GetSsoCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetSsoCodeMutation, GetSsoCodeMutationVariables>(GetSsoCodeDocument, options);
      }
export type GetSsoCodeMutationHookResult = ReturnType<typeof useGetSsoCodeMutation>;
export type GetSsoCodeMutationResult = Apollo.MutationResult<GetSsoCodeMutation>;
export type GetSsoCodeMutationOptions = Apollo.BaseMutationOptions<GetSsoCodeMutation, GetSsoCodeMutationVariables>;
export const GetAccessTokenDocument = gql`
    mutation GetAccessToken($code: String!) {
  getAccessToken(code: $code)
}
    `;
export type GetAccessTokenMutationFn = Apollo.MutationFunction<GetAccessTokenMutation, GetAccessTokenMutationVariables>;

/**
 * __useGetAccessTokenMutation__
 *
 * To run a mutation, you first call `useGetAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getAccessTokenMutation, { data, loading, error }] = useGetAccessTokenMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<GetAccessTokenMutation, GetAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetAccessTokenMutation, GetAccessTokenMutationVariables>(GetAccessTokenDocument, options);
      }
export type GetAccessTokenMutationHookResult = ReturnType<typeof useGetAccessTokenMutation>;
export type GetAccessTokenMutationResult = Apollo.MutationResult<GetAccessTokenMutation>;
export type GetAccessTokenMutationOptions = Apollo.BaseMutationOptions<GetAccessTokenMutation, GetAccessTokenMutationVariables>;