import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class UpdateTeamInput {
	@Field(_type => ID)
	id: number

	@Field(_type => String)
	title: string

	@Field(_type => String)
	description: string
}
