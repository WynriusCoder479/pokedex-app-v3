import { UserMutationResponse } from '../../types/response/UserMutationResponse'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { LoginInput } from '../../types/auth/LoginInput'
import { User } from '../../entities/User'
import argon2 from 'argon2'
import { Context } from '../../types/util/Context'
import { internalServerError } from '../../utils/internalServerError'

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
							field: 'usernameOrPassword',
							message: 'User name or/and email or/and password in correct'
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
					message: 'Password wrong',
					errors: [
						{
							field: 'password',
							message: 'User name or/and email or/and password in correct'
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
			throw internalServerError(error)
		}
	}
}
