export interface RegisterInput {
	username: string
	email: string
	password: string
}

export interface RegisterFormInput extends RegisterInput {
	confirmPassword: string
}

export interface LoginInput {
	usernameOrEmail: string
	password: string
}
