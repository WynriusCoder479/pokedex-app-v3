import { Context } from '../../types/utils/Context'
import { COOKIE_NAME } from '../../utils/Constants'
import { Ctx, Mutation, Resolver } from 'type-graphql'

@Resolver()
export class UserLogoutResolver {
	@Mutation(_return => Boolean)
	logout(@Ctx() context: Context): Promise<boolean> {
		const { res, req } = context

		return new Promise((resolve, _reject) => {
			res.clearCookie(COOKIE_NAME)

			req.session.destroy(error => {
				if (error) {
					console.log(`ESTROYING SESSION ERROR: ${error}`)
					resolve(false)
				}
				resolve(true)
			})
		})
	}
}
