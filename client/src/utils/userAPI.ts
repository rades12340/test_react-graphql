import { GraphQLClient } from 'graphql-request'
import { EmailPasswordInput, FieldError, LoginDocument, MeDocument, MeResponse, RegisterDocument, User, UserResponse, LoginMutationVariables, RegisterMutationVariables, LogoutDocument } from '../generated/graphql'

export const client = new GraphQLClient('http://localhost:8080/graphql', {
  credentials: 'include',
  mode: "cors"
})

class UserAPI {
  async registerUser(user: EmailPasswordInput): Promise<{ register: { errors: FieldError[], user: User } }> {
    const variables: RegisterMutationVariables = {
      options: user,
    }

    return await client.request(RegisterDocument, variables)
  }

  //async forgotPassword(email: string): Promise<{ forgotPasswrod: }>

  async loginUser(email: string, password: string): Promise<{ login: { errors: FieldError[], user: User } }> {
    const variables: LoginMutationVariables = {
      email,
      password
    }
    return await client.request(LoginDocument, variables)
  }

  async me(): Promise<{ me: MeResponse }> {

    const data = await client.request(MeDocument)

    return data
  }

  async logout() {
    const data = await client.request(LogoutDocument)

    return data
  }


}


export default new UserAPI()