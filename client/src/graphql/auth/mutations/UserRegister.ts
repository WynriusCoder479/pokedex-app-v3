import { gql } from '@apollo/client'

export const USER_REGISTER = gql`
	mutation Register($registerInput: RegisterInput!) {
		register(registerInput: $registerInput) {
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
