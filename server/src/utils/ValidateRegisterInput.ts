import * as emailValidator from 'email-validator'
import { UserResponse } from 'src/types/response/UserRespones'
import { RegisterInput } from '../types/auth/RsgieterInput'

export const validateRegisterInput = (
	registerInput: RegisterInput
): UserResponse | null => {
	const { username, email, password } = registerInput

	const passwordPartern =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

	if (username.length <= 4 || username.includes('@'))
		return {
			message: 'Invalid username',
			errors: [
				{
					field: 'username',
					message:
						'Username length must be greater than 2 and not includes @ character'
				}
			]
		}

	const emailValidate = emailValidator.validate(email)

	if (!emailValidate)
		return {
			message: 'Invalid email',
			errors: [
				{
					field: 'email',
					message: 'Email wrong form'
				}
			]
		}

	const passwordValidate = passwordPartern.test(password)

	if (!passwordValidate)
		return {
			message: 'Invalid password',
			errors: [
				{
					field: 'email',
					message:
						'Password must be greater than 8, at least one uppercase letter, at least one digit, and at least one special charactor'
				}
			]
		}

	return null
}
