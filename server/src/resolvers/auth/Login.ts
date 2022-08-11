import argon2 from 'argon2'
import { User } from '../../entities/User'
import { LoginInput } from '../../types/auth/LoginInput'
import { UserMutationResponse } from '../../types/response/UserMutationResponse'
import { Context } from '../../types/utils/Context'
import { internalServerError } from '../../utils/InternalServerError'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

@Resolver()
export class UserLoginResolver {
	@Mutation(_return => UserMutationResponse)
	async login(
		@Arg('loginInput') loginInput: LoginInput,
		@Ctx() context: Context
	): Promise<UserMutationResponse> {
		try {
			const { usernameOrEmail, password } = loginInput

			const existingUser = await User.findOneBy(
				usernameOrEmail.includes('@')
					? { email: usernameOrEmail }
					: { username: usernameOrEmail }
			)

			if (!existingUser)
				return {
					code: 400,
					success: false,
					message: 'User not found',
					errors: [
						{
							field: 'usernameOrEmail',
							message: 'Username or/and email or/and password incorect'
						}
					]
				}

			const verifyPassword = await argon2.verify(
				existingUser.password,
				password
			)

			if (!verifyPassword)
				return {
					code: 400,
					success: false,
					message: 'User not found',
					errors: [
						{
							field: 'usernameOrEmail',
							message: 'Username or/and email or/and password incorect'
						}
					]
				}

			const { req } = context

			req.session.userId = existingUser.id

			return {
				code: 200,
				success: true,
				message: 'User loged in successfully',
				user: existingUser
			}
		} catch (error) {
			console.log(error)
			throw internalServerError(error)
		}
	}
}
