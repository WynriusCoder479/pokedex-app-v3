import { IsEmail } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class RegisterInput {
	@Field(_type => String)
	username: string

	@Field(_type => String)
	@IsEmail()
	email: string

	@Field(_type => String)
	password: string
}
