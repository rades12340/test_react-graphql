import { GraphQLClient } from 'graphql-request';
// @ts-ignore
import { HeadersInit } from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<MeResponse>;
  item?: Maybe<Item>;
  allItems?: Maybe<Array<Item>>;
};


export type QueryItemArgs = {
  id: Scalars['Float'];
};

export type MeResponse = {
  __typename?: 'MeResponse';
  id: Scalars['Float'];
  email: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Float'];
  title: Scalars['String'];
  created_at: Scalars['DateTime'];
  creator: User;
};


export type User = {
  __typename?: 'User';
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  logout: Scalars['Boolean'];
  addItem: ItemResponse;
};


export type MutationRegisterArgs = {
  options: EmailPasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  changePassInput: ChangePasswordInput;
};


export type MutationAddItemArgs = {
  title: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type EmailPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ChangePasswordInput = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type ItemResponse = {
  __typename?: 'ItemResponse';
  errors?: Maybe<Array<FieldError>>;
  item?: Maybe<Item>;
};

export type AddItemMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type AddItemMutation = (
  { __typename?: 'Mutation' }
  & {
    addItem: (
      { __typename?: 'ItemResponse' }
      & {
        errors?: Maybe<Array<(
          { __typename?: 'FieldError' }
          & Pick<FieldError, 'field' | 'message'>
        )>>, item?: Maybe<(
          { __typename?: 'Item' }
          & Pick<Item, 'id' | 'title'>
          & {
            creator: (
              { __typename?: 'User' }
              & Pick<User, 'email'>
            )
          }
        )>
      }
    )
  }
);

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & {
    changePassword: (
      { __typename?: 'UserResponse' }
      & {
        errors?: Maybe<Array<(
          { __typename?: 'FieldError' }
          & Pick<FieldError, 'field' | 'message'>
        )>>, user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'email'>
        )>
      }
    )
  }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & {
    login: (
      { __typename?: 'UserResponse' }
      & {
        errors?: Maybe<Array<(
          { __typename?: 'FieldError' }
          & Pick<FieldError, 'field' | 'message'>
        )>>, user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'email'>
        )>
      }
    )
  }
);

export type RegisterMutationVariables = Exact<{
  options: EmailPasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & {
    register: (
      { __typename?: 'UserResponse' }
      & {
        errors?: Maybe<Array<(
          { __typename?: 'FieldError' }
          & Pick<FieldError, 'field' | 'message'>
        )>>, user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'email'>
        )>
      }
    )
  }
);

export type AllItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllItemsQuery = (
  { __typename?: 'Query' }
  & {
    allItems?: Maybe<Array<(
      { __typename?: 'Item' }
      & Pick<Item, 'id' | 'title' | 'created_at'>
      & {
        creator: (
          { __typename?: 'User' }
          & Pick<User, 'email'>
        )
      }
    )>>
  }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & {
    me?: Maybe<(
      { __typename?: 'MeResponse' }
      & Pick<MeResponse, 'id' | 'email'>
    )>
  }
);


export const AddItemDocument = gql`
    mutation AddItem($title: String!) {
  addItem(title: $title) {
    errors {
      field
      message
    }
    item {
      id
      title
      creator {
        email
      }
    }
  }
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
  changePassword(changePassInput: $changePasswordInput) {
    errors {
      field
      message
    }
    user {
      email
    }
  }
}
    `;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      email
    }
  }
}
    `;
export const RegisterDocument = gql`
    mutation Register($options: EmailPasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      email
    }
  }
}
    `;
export const AllItemsDocument = gql`
    query AllItems {
  allItems {
    id
    title
    created_at
    creator {
      email
    }
  }
}
    `;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AddItem(variables: AddItemMutationVariables, requestHeaders?: HeadersInit): Promise<AddItemMutation> {
      return withWrapper(() => client.request<AddItemMutation>(print(AddItemDocument), variables, requestHeaders));
    },
    ChangePassword(variables: ChangePasswordMutationVariables, requestHeaders?: HeadersInit): Promise<ChangePasswordMutation> {
      return withWrapper(() => client.request<ChangePasswordMutation>(print(ChangePasswordDocument), variables, requestHeaders));
    },
    ForgotPassword(variables: ForgotPasswordMutationVariables, requestHeaders?: HeadersInit): Promise<ForgotPasswordMutation> {
      return withWrapper(() => client.request<ForgotPasswordMutation>(print(ForgotPasswordDocument), variables, requestHeaders));
    },
    Login(variables: LoginMutationVariables, requestHeaders?: HeadersInit): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(print(LoginDocument), variables, requestHeaders));
    },
    Register(variables: RegisterMutationVariables, requestHeaders?: HeadersInit): Promise<RegisterMutation> {
      return withWrapper(() => client.request<RegisterMutation>(print(RegisterDocument), variables, requestHeaders));
    },
    AllItems(variables?: AllItemsQueryVariables, requestHeaders?: HeadersInit): Promise<AllItemsQuery> {
      return withWrapper(() => client.request<AllItemsQuery>(print(AllItemsDocument), variables, requestHeaders));
    },
    Logout(variables?: LogoutMutationVariables, requestHeaders?: HeadersInit): Promise<LogoutMutation> {
      return withWrapper(() => client.request<LogoutMutation>(print(LogoutDocument), variables, requestHeaders));
    },
    Me(variables?: MeQueryVariables, requestHeaders?: HeadersInit): Promise<MeQuery> {
      return withWrapper(() => client.request<MeQuery>(print(MeDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;