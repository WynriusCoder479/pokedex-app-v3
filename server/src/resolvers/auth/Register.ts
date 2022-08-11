import { RegisterInput } from '../../types/auth/RsgieterInput'
import { UserMutationResponse } from '../../types/response/UserMutationResponse'
import { Context } from '../../types/utils/Context'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { validateRegisterInput } from '../../utils/ValidateRegisterInput'
import { User } from '../../entities/User'
import argon2 from 'argon2'
import { internalServerError } from '../../utils/InternalServerError'

@Resolver()
export class UserRegisterResolver {
	@Mutation(_return => UserMutationResponse)
	async register(
		@Arg('registerInput') registerInput: RegisterInput,
		@Ctx() context: Context
	): Promise<UserMutationResponse> {
		const validateRegiterInputErrors = validateRegisterInput(registerInput)

		if (validateRegiterInputErrors)
			return {
				code: 400,
				success: false,
				...validateRegiterInputErrors
			}

		try {
			const { username, email, password } = registerInput

			const existingUser = await User.findOne({
				where: [{ username }, { email }]
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

			const { req } = context

			await newUser.save()

			req.session.userId = newUser.id

			return {
				code: 200,
				success: true,
				message: 'User registration successfully',
				user: newUser
			}
		} catch (error) {
			console.log(error)
			throw internalServerError(error)
		}
	}
}
