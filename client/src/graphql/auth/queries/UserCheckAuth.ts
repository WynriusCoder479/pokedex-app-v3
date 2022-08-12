import { gql } from '@apollo/client'

export const USER_CHECK_AUTH = gql`
	query CheckAuth {
		checkAuth {
			code
			success
			message
		}
	}
`
