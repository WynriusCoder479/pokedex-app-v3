import { UserMutationResponse } from '../../types/response/UserMutationResponse'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { RegisterInput } from '../../types/auth/RegisterInput'
import { validateRegisterInput } from '../../utils/validateRegisterInput'
import { User } from '../../entities/User'
import argon2 from 'argon2'
import { internalServerError } from '../../utils/internalServerError'
import { Context } from '../../types/util/Context'

@Resolver()
export class UserRegisterResolver {
	@Mutation(_return => UserMutationResponse)
	async register(
		@Arg('registerInput') registerInput: RegisterInput,
		@Ctx() context: Context
	): Promise<UserMutationResponse> {
		const validateRegisterInputError = validateRegisterInput(registerInput)

		if (validateRegisterInputError !== null)
			return {
				code: 400,
				success: false,
				...validateRegisterInputError
			}

		try {
			const { username, email, password } = registerInput

			const existingUser = await User.findOne({
				where: [{ username }, { username }]
			})

			if (existingUser)
				return {
					code: 400,
					success: false,
					message: 'Duplicated username or email',

					errors: [
						{
							field: existingUser.username === username ? 'username' : 'email',
							message: `${
								existingUser.username === username ? 'Username' : 'Email'
							} already taken`
						}
					]
				}

			const hashedPassword = await argon2.hash(password)

			const newUser = User.create({
				username,
				email,
				password: hashedPassword
			})

			await newUser.save()

			const { req } = context

			req.session.userId = newUser.id

			return {
				code: 200,
				success: true,
				message: 'User registration successfully',
				user: newUser
			}
		} catch (error) {
			throw internalServerError(error)
		}
	}
}
