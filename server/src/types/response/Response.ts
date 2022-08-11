import { Field, InterfaceType } from 'type-graphql'

@InterfaceType()
export abstract class IResponse {
	@Field(_type => Number)
	code: number

	@Field(_type => Boolean)
	success: boolean

	@Field(_type => String)
	message?: string
}
