import { Field, InputType } from 'type-graphql'

@InputType()
export class RegisterInput {
	@Field(_type => String)
	username!: string

	@Field(_type => String)
	email!: string

	@Field(_type => String)
	password!: string
}
