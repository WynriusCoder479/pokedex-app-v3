import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateTeamInput {
	@Field(_type => String)
	title: string

	@Field(_type => String)
	description: string
}
