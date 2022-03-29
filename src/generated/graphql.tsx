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
  Date: any;
};

export type Account = Node & {
  __typename?: 'Account';
  createdAt: Scalars['Date'];
  did: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  isClient: Scalars['Boolean'];
  sessions?: Maybe<Array<AccountSession>>;
  status: AccountStatus;
  updatedAt: Scalars['Date'];
};

export type AccountSession = Node & {
  __typename?: 'AccountSession';
  account: Account;
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  expiresAt: Scalars['Date'];
  id: Scalars['Int'];
  ipAddr: Scalars['String'];
  updatedAt: Scalars['Date'];
  userAgent?: Maybe<UserAgent>;
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED'
}

export type AuthResult = {
  __typename?: 'AuthResult';
  account: Account;
  code?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type CostComplexity = {
  max?: InputMaybe<Scalars['Int']>;
  min?: InputMaybe<Scalars['Int']>;
};

export type GenerateEmailCodeResult = {
  __typename?: 'GenerateEmailCodeResult';
  expiresAt: Scalars['Date'];
  result: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  accessToken: AuthResult;
  echo: Scalars['String'];
  generateAuthCode: Scalars['String'];
  generateEmailCode: GenerateEmailCodeResult;
  loginByEmail: AuthResult;
  registerClient: AuthResult;
};


export type MutationAccessTokenArgs = {
  authCode: Scalars['String'];
};


export type MutationEchoArgs = {
  text: Scalars['String'];
};


export type MutationGenerateEmailCodeArgs = {
  email: Scalars['String'];
};


export type MutationLoginByEmailArgs = {
  email: Scalars['String'];
  emailCode: Scalars['String'];
};


export type MutationRegisterClientArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type Node = {
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  updatedAt: Scalars['Date'];
};

export type Query = {
  __typename?: 'Query';
  currentSession: AccountSession;
  echo: Scalars['String'];
  error?: Maybe<Scalars['Int']>;
  whoami: Account;
};


export type QueryEchoArgs = {
  text: Scalars['String'];
};

export type UserAgent = {
  __typename?: 'UserAgent';
  browser?: Maybe<UserAgentBrowser>;
  cpu?: Maybe<UserAgentCpu>;
  engine?: Maybe<UserAgentEngine>;
  os?: Maybe<UserAgentOs>;
  ua?: Maybe<Scalars['String']>;
};

export type UserAgentBrowser = {
  __typename?: 'UserAgentBrowser';
  major?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type UserAgentCpu = {
  __typename?: 'UserAgentCpu';
  architecture?: Maybe<Scalars['String']>;
};

export type UserAgentEngine = {
  __typename?: 'UserAgentEngine';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type UserAgentOs = {
  __typename?: 'UserAgentOs';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type GenerateEmailCodeMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type GenerateEmailCodeMutation = { __typename?: 'Mutation', generateEmailCode: { __typename?: 'GenerateEmailCodeResult', result: boolean, expiresAt: any } };

export type RegisterClientMutationVariables = Exact<{
  email: Scalars['String'];
  code: Scalars['String'];
}>;


export type RegisterClientMutation = { __typename?: 'Mutation', registerClient: { __typename?: 'AuthResult', code?: string | null, token: string, account: { __typename?: 'Account', id: number, email: string, did: string, isClient: boolean, status: AccountStatus } } };


export const GenerateEmailCodeDocument = gql`
    mutation GenerateEmailCode($email: String!) {
  generateEmailCode(email: $email) {
    result
    expiresAt
  }
}
    `;
export type GenerateEmailCodeMutationFn = Apollo.MutationFunction<GenerateEmailCodeMutation, GenerateEmailCodeMutationVariables>;

/**
 * __useGenerateEmailCodeMutation__
 *
 * To run a mutation, you first call `useGenerateEmailCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateEmailCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateEmailCodeMutation, { data, loading, error }] = useGenerateEmailCodeMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGenerateEmailCodeMutation(baseOptions?: Apollo.MutationHookOptions<GenerateEmailCodeMutation, GenerateEmailCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateEmailCodeMutation, GenerateEmailCodeMutationVariables>(GenerateEmailCodeDocument, options);
      }
export type GenerateEmailCodeMutationHookResult = ReturnType<typeof useGenerateEmailCodeMutation>;
export type GenerateEmailCodeMutationResult = Apollo.MutationResult<GenerateEmailCodeMutation>;
export type GenerateEmailCodeMutationOptions = Apollo.BaseMutationOptions<GenerateEmailCodeMutation, GenerateEmailCodeMutationVariables>;
export const RegisterClientDocument = gql`
    mutation RegisterClient($email: String!, $code: String!) {
  registerClient(email: $email, code: $code) {
    code
    token
    account {
      id
      email
      did
      isClient
      status
    }
  }
}
    `;
export type RegisterClientMutationFn = Apollo.MutationFunction<RegisterClientMutation, RegisterClientMutationVariables>;

/**
 * __useRegisterClientMutation__
 *
 * To run a mutation, you first call `useRegisterClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerClientMutation, { data, loading, error }] = useRegisterClientMutation({
 *   variables: {
 *      email: // value for 'email'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useRegisterClientMutation(baseOptions?: Apollo.MutationHookOptions<RegisterClientMutation, RegisterClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterClientMutation, RegisterClientMutationVariables>(RegisterClientDocument, options);
      }
export type RegisterClientMutationHookResult = ReturnType<typeof useRegisterClientMutation>;
export type RegisterClientMutationResult = Apollo.MutationResult<RegisterClientMutation>;
export type RegisterClientMutationOptions = Apollo.BaseMutationOptions<RegisterClientMutation, RegisterClientMutationVariables>;