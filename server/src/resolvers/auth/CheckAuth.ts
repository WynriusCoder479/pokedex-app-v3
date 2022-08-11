import { checkAuth } from '../../middleware/checkAuth'
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserMutationResponse } from '../../types/response/UserMutationResponse'
import { Context } from '../../types/utils/Context'
import { User } from '../../entities/User'
import { internalServerError } from '../../utils/InternalServerError'

@Resolver()
export class UserCheckAuthResolver {
	@Query(_return => UserMutationResponse)
	@UseMiddleware(checkAuth)
	async checkAuth(@Ctx() context: Context): Promise<UserMutationResponse> {
		try {
			const { req } = context

			const existingUser = await User.findOneBy({ id: req.session.userId })

			if (!existingUser)
				return {
					code: 400,
					success: false,
					message: 'User not found'
				}

			return {
				code: 200,
				success: true,
				message: 'User check auth successfully',
				user: existingUser
			}
		} catch (error) {
			console.log(error)
			throw internalServerError(error)
		}
	}
}
