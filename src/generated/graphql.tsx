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
  /** Access token of SSO user */
  accessToken: AuthResult;
  echo: Scalars['String'];
  /** Generate oAuth2-like code for Client's site. */
  generateAuthCode: Scalars['String'];
  /** Login with DID. Returns string to sign with client's DID. */
  generateDidOtc: Scalars['String'];
  /** Generate and send email code for any account type. */
  generateEmailCode: GenerateEmailCodeResult;
  generateEverWalletCode: Scalars['String'];
  /** Login with DID */
  loginViaDID: AuthResult;
  /** Login via email and one time code. */
  loginViaEmail: AuthResult;
  loginViaEverWallet: AuthResult;
  loginViaFacebook: AuthResult;
  loginViaGoogle: AuthResult;
};


export type MutationAccessTokenArgs = {
  authCode: Scalars['String'];
};


export type MutationEchoArgs = {
  text: Scalars['String'];
};


export type MutationGenerateDidOtcArgs = {
  did: Scalars['String'];
};


export type MutationGenerateEmailCodeArgs = {
  email: Scalars['String'];
};


export type MutationGenerateEverWalletCodeArgs = {
  publicKey: Scalars['String'];
};


export type MutationLoginViaDidArgs = {
  did: Scalars['String'];
  otcSignatureHex: Scalars['String'];
};


export type MutationLoginViaEmailArgs = {
  email: Scalars['String'];
  emailCode: Scalars['String'];
};


export type MutationLoginViaEverWalletArgs = {
  codeSignatureHex: Scalars['String'];
  publicKey: Scalars['String'];
};


export type MutationLoginViaFacebookArgs = {
  code: Scalars['String'];
};


export type MutationLoginViaGoogleArgs = {
  code: Scalars['String'];
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

export type GenerateAuthCodeMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateAuthCodeMutation = { __typename?: 'Mutation', generateAuthCode: string };

export type GenerateEverWalletCodeMutationVariables = Exact<{
  publicKey: Scalars['String'];
}>;


export type GenerateEverWalletCodeMutation = { __typename?: 'Mutation', generateEverWalletCode: string };

export type GenerateDidOtcMutationVariables = Exact<{
  did: Scalars['String'];
}>;


export type GenerateDidOtcMutation = { __typename?: 'Mutation', generateDidOtc: string };

export type LoginViaEmailMutationVariables = Exact<{
  email: Scalars['String'];
  emailCode: Scalars['String'];
}>;


export type LoginViaEmailMutation = { __typename?: 'Mutation', loginViaEmail: { __typename?: 'AuthResult', token: string, account: { __typename?: 'Account', id: number, email: string, did: string, isClient: boolean, status: AccountStatus } } };

export type LoginViaDidMutationVariables = Exact<{
  did: Scalars['String'];
  otcSignatureHex: Scalars['String'];
}>;


export type LoginViaDidMutation = { __typename?: 'Mutation', loginViaDID: { __typename?: 'AuthResult', token: string, account: { __typename?: 'Account', id: number, email: string, did: string, isClient: boolean, status: AccountStatus } } };

export type LoginViaFacebookMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginViaFacebookMutation = { __typename?: 'Mutation', loginViaFacebook: { __typename?: 'AuthResult', token: string, account: { __typename?: 'Account', id: number, createdAt: any, updatedAt: any, isClient: boolean, did: string, email: string } } };

export type LoginViaGoogleMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type LoginViaGoogleMutation = { __typename?: 'Mutation', loginViaGoogle: { __typename?: 'AuthResult', token: string, account: { __typename?: 'Account', id: number, createdAt: any, updatedAt: any, isClient: boolean, did: string, email: string } } };

export type LoginViaEverWalletMutationVariables = Exact<{
  publicKey: Scalars['String'];
  codeSignatureHex: Scalars['String'];
}>;


export type LoginViaEverWalletMutation = { __typename?: 'Mutation', loginViaEverWallet: { __typename?: 'AuthResult', token: string, account: { __typename?: 'Account', id: number, createdAt: any, updatedAt: any, isClient: boolean, did: string, email: string } } };

export type AccessTokenMutationVariables = Exact<{
  authCode: Scalars['String'];
}>;


export type AccessTokenMutation = { __typename?: 'Mutation', accessToken: { __typename?: 'AuthResult', token: string, account: { __typename?: 'Account', id: number, createdAt: any, updatedAt: any, isClient: boolean, did: string, email: string } } };


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
export const GenerateAuthCodeDocument = gql`
    mutation GenerateAuthCode {
  generateAuthCode
}
    `;
export type GenerateAuthCodeMutationFn = Apollo.MutationFunction<GenerateAuthCodeMutation, GenerateAuthCodeMutationVariables>;

/**
 * __useGenerateAuthCodeMutation__
 *
 * To run a mutation, you first call `useGenerateAuthCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateAuthCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateAuthCodeMutation, { data, loading, error }] = useGenerateAuthCodeMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateAuthCodeMutation(baseOptions?: Apollo.MutationHookOptions<GenerateAuthCodeMutation, GenerateAuthCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateAuthCodeMutation, GenerateAuthCodeMutationVariables>(GenerateAuthCodeDocument, options);
      }
export type GenerateAuthCodeMutationHookResult = ReturnType<typeof useGenerateAuthCodeMutation>;
export type GenerateAuthCodeMutationResult = Apollo.MutationResult<GenerateAuthCodeMutation>;
export type GenerateAuthCodeMutationOptions = Apollo.BaseMutationOptions<GenerateAuthCodeMutation, GenerateAuthCodeMutationVariables>;
export const GenerateEverWalletCodeDocument = gql`
    mutation GenerateEverWalletCode($publicKey: String!) {
  generateEverWalletCode(publicKey: $publicKey)
}
    `;
export type GenerateEverWalletCodeMutationFn = Apollo.MutationFunction<GenerateEverWalletCodeMutation, GenerateEverWalletCodeMutationVariables>;

/**
 * __useGenerateEverWalletCodeMutation__
 *
 * To run a mutation, you first call `useGenerateEverWalletCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateEverWalletCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateEverWalletCodeMutation, { data, loading, error }] = useGenerateEverWalletCodeMutation({
 *   variables: {
 *      publicKey: // value for 'publicKey'
 *   },
 * });
 */
export function useGenerateEverWalletCodeMutation(baseOptions?: Apollo.MutationHookOptions<GenerateEverWalletCodeMutation, GenerateEverWalletCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateEverWalletCodeMutation, GenerateEverWalletCodeMutationVariables>(GenerateEverWalletCodeDocument, options);
      }
export type GenerateEverWalletCodeMutationHookResult = ReturnType<typeof useGenerateEverWalletCodeMutation>;
export type GenerateEverWalletCodeMutationResult = Apollo.MutationResult<GenerateEverWalletCodeMutation>;
export type GenerateEverWalletCodeMutationOptions = Apollo.BaseMutationOptions<GenerateEverWalletCodeMutation, GenerateEverWalletCodeMutationVariables>;
export const GenerateDidOtcDocument = gql`
    mutation GenerateDidOtc($did: String!) {
  generateDidOtc(did: $did)
}
    `;
export type GenerateDidOtcMutationFn = Apollo.MutationFunction<GenerateDidOtcMutation, GenerateDidOtcMutationVariables>;

/**
 * __useGenerateDidOtcMutation__
 *
 * To run a mutation, you first call `useGenerateDidOtcMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateDidOtcMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateDidOtcMutation, { data, loading, error }] = useGenerateDidOtcMutation({
 *   variables: {
 *      did: // value for 'did'
 *   },
 * });
 */
export function useGenerateDidOtcMutation(baseOptions?: Apollo.MutationHookOptions<GenerateDidOtcMutation, GenerateDidOtcMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateDidOtcMutation, GenerateDidOtcMutationVariables>(GenerateDidOtcDocument, options);
      }
export type GenerateDidOtcMutationHookResult = ReturnType<typeof useGenerateDidOtcMutation>;
export type GenerateDidOtcMutationResult = Apollo.MutationResult<GenerateDidOtcMutation>;
export type GenerateDidOtcMutationOptions = Apollo.BaseMutationOptions<GenerateDidOtcMutation, GenerateDidOtcMutationVariables>;
export const LoginViaEmailDocument = gql`
    mutation LoginViaEmail($email: String!, $emailCode: String!) {
  loginViaEmail(email: $email, emailCode: $emailCode) {
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
export type LoginViaEmailMutationFn = Apollo.MutationFunction<LoginViaEmailMutation, LoginViaEmailMutationVariables>;

/**
 * __useLoginViaEmailMutation__
 *
 * To run a mutation, you first call `useLoginViaEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginViaEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginViaEmailMutation, { data, loading, error }] = useLoginViaEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      emailCode: // value for 'emailCode'
 *   },
 * });
 */
export function useLoginViaEmailMutation(baseOptions?: Apollo.MutationHookOptions<LoginViaEmailMutation, LoginViaEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginViaEmailMutation, LoginViaEmailMutationVariables>(LoginViaEmailDocument, options);
      }
export type LoginViaEmailMutationHookResult = ReturnType<typeof useLoginViaEmailMutation>;
export type LoginViaEmailMutationResult = Apollo.MutationResult<LoginViaEmailMutation>;
export type LoginViaEmailMutationOptions = Apollo.BaseMutationOptions<LoginViaEmailMutation, LoginViaEmailMutationVariables>;
export const LoginViaDidDocument = gql`
    mutation LoginViaDID($did: String!, $otcSignatureHex: String!) {
  loginViaDID(did: $did, otcSignatureHex: $otcSignatureHex) {
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
export type LoginViaDidMutationFn = Apollo.MutationFunction<LoginViaDidMutation, LoginViaDidMutationVariables>;

/**
 * __useLoginViaDidMutation__
 *
 * To run a mutation, you first call `useLoginViaDidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginViaDidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginViaDidMutation, { data, loading, error }] = useLoginViaDidMutation({
 *   variables: {
 *      did: // value for 'did'
 *      otcSignatureHex: // value for 'otcSignatureHex'
 *   },
 * });
 */
export function useLoginViaDidMutation(baseOptions?: Apollo.MutationHookOptions<LoginViaDidMutation, LoginViaDidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginViaDidMutation, LoginViaDidMutationVariables>(LoginViaDidDocument, options);
      }
export type LoginViaDidMutationHookResult = ReturnType<typeof useLoginViaDidMutation>;
export type LoginViaDidMutationResult = Apollo.MutationResult<LoginViaDidMutation>;
export type LoginViaDidMutationOptions = Apollo.BaseMutationOptions<LoginViaDidMutation, LoginViaDidMutationVariables>;
export const LoginViaFacebookDocument = gql`
    mutation LoginViaFacebook($code: String!) {
  loginViaFacebook(code: $code) {
    token
    account {
      id
      createdAt
      updatedAt
      isClient
      did
      email
    }
  }
}
    `;
export type LoginViaFacebookMutationFn = Apollo.MutationFunction<LoginViaFacebookMutation, LoginViaFacebookMutationVariables>;

/**
 * __useLoginViaFacebookMutation__
 *
 * To run a mutation, you first call `useLoginViaFacebookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginViaFacebookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginViaFacebookMutation, { data, loading, error }] = useLoginViaFacebookMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useLoginViaFacebookMutation(baseOptions?: Apollo.MutationHookOptions<LoginViaFacebookMutation, LoginViaFacebookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginViaFacebookMutation, LoginViaFacebookMutationVariables>(LoginViaFacebookDocument, options);
      }
export type LoginViaFacebookMutationHookResult = ReturnType<typeof useLoginViaFacebookMutation>;
export type LoginViaFacebookMutationResult = Apollo.MutationResult<LoginViaFacebookMutation>;
export type LoginViaFacebookMutationOptions = Apollo.BaseMutationOptions<LoginViaFacebookMutation, LoginViaFacebookMutationVariables>;
export const LoginViaGoogleDocument = gql`
    mutation LoginViaGoogle($code: String!) {
  loginViaGoogle(code: $code) {
    token
    account {
      id
      createdAt
      updatedAt
      isClient
      did
      email
    }
  }
}
    `;
export type LoginViaGoogleMutationFn = Apollo.MutationFunction<LoginViaGoogleMutation, LoginViaGoogleMutationVariables>;

/**
 * __useLoginViaGoogleMutation__
 *
 * To run a mutation, you first call `useLoginViaGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginViaGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginViaGoogleMutation, { data, loading, error }] = useLoginViaGoogleMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useLoginViaGoogleMutation(baseOptions?: Apollo.MutationHookOptions<LoginViaGoogleMutation, LoginViaGoogleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginViaGoogleMutation, LoginViaGoogleMutationVariables>(LoginViaGoogleDocument, options);
      }
export type LoginViaGoogleMutationHookResult = ReturnType<typeof useLoginViaGoogleMutation>;
export type LoginViaGoogleMutationResult = Apollo.MutationResult<LoginViaGoogleMutation>;
export type LoginViaGoogleMutationOptions = Apollo.BaseMutationOptions<LoginViaGoogleMutation, LoginViaGoogleMutationVariables>;
export const LoginViaEverWalletDocument = gql`
    mutation LoginViaEverWallet($publicKey: String!, $codeSignatureHex: String!) {
  loginViaEverWallet(publicKey: $publicKey, codeSignatureHex: $codeSignatureHex) {
    token
    account {
      id
      createdAt
      updatedAt
      isClient
      did
      email
    }
  }
}
    `;
export type LoginViaEverWalletMutationFn = Apollo.MutationFunction<LoginViaEverWalletMutation, LoginViaEverWalletMutationVariables>;

/**
 * __useLoginViaEverWalletMutation__
 *
 * To run a mutation, you first call `useLoginViaEverWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginViaEverWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginViaEverWalletMutation, { data, loading, error }] = useLoginViaEverWalletMutation({
 *   variables: {
 *      publicKey: // value for 'publicKey'
 *      codeSignatureHex: // value for 'codeSignatureHex'
 *   },
 * });
 */
export function useLoginViaEverWalletMutation(baseOptions?: Apollo.MutationHookOptions<LoginViaEverWalletMutation, LoginViaEverWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginViaEverWalletMutation, LoginViaEverWalletMutationVariables>(LoginViaEverWalletDocument, options);
      }
export type LoginViaEverWalletMutationHookResult = ReturnType<typeof useLoginViaEverWalletMutation>;
export type LoginViaEverWalletMutationResult = Apollo.MutationResult<LoginViaEverWalletMutation>;
export type LoginViaEverWalletMutationOptions = Apollo.BaseMutationOptions<LoginViaEverWalletMutation, LoginViaEverWalletMutationVariables>;
export const AccessTokenDocument = gql`
    mutation AccessToken($authCode: String!) {
  accessToken(authCode: $authCode) {
    token
    account {
      id
      createdAt
      updatedAt
      isClient
      did
      email
    }
  }
}
    `;
export type AccessTokenMutationFn = Apollo.MutationFunction<AccessTokenMutation, AccessTokenMutationVariables>;

/**
 * __useAccessTokenMutation__
 *
 * To run a mutation, you first call `useAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accessTokenMutation, { data, loading, error }] = useAccessTokenMutation({
 *   variables: {
 *      authCode: // value for 'authCode'
 *   },
 * });
 */
export function useAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<AccessTokenMutation, AccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AccessTokenMutation, AccessTokenMutationVariables>(AccessTokenDocument, options);
      }
export type AccessTokenMutationHookResult = ReturnType<typeof useAccessTokenMutation>;
export type AccessTokenMutationResult = Apollo.MutationResult<AccessTokenMutation>;
export type AccessTokenMutationOptions = Apollo.BaseMutationOptions<AccessTokenMutation, AccessTokenMutationVariables>;