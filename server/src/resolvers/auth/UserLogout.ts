import { Context } from '../../types/util/Context'
import { COOKIE_NAME } from '../../utils/constants'
import { Ctx, Mutation, Resolver } from 'type-graphql'

@Resolver()
export class UserLogoutResolver {
	@Mutation(_return => Boolean)
	logout(@Ctx() { req, res }: Context): Promise<boolean> {
		return new Promise((resolve, _reject) => {
			res.clearCookie(COOKIE_NAME)

			req.session.destroy(error => {
				if (error) {
					console.log('DESTROYING SESSION ERROR', error)
					resolve(false)
				}
				resolve(true)
			})
		})
	}
}
