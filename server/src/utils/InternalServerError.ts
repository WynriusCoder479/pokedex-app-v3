import { UserMutationResponse } from 'src/types/response/UserMutationResponse'

export const internalServerError = (error: any): UserMutationResponse => {
	return {
		code: 500,
		success: false,
		message: `Internal server error ${error.message}`
	}
}
