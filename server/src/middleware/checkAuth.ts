import { AuthenticationError } from 'apollo-server-core'
import { Context } from '../types/util/Context'
import { MiddlewareFn } from 'type-graphql'

export const checkAuth: MiddlewareFn<Context> = (
	{ context: { req } },
	next
) => {
	if (!req.session.userId)
		throw new AuthenticationError(
			'Not authenticated to perform GraphQL operations'
		)

	return next()
}
