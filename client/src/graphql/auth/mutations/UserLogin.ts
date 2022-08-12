import { gql } from '@apollo/client'

export const USER_LOGIN = gql`
	mutation Login($loginInput: LoginInput!) {
		login(loginInput: $loginInput) {
			code
			success
			message
			errors {
				field
				message
			}
		}
	}
`
