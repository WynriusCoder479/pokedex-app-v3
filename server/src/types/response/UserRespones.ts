import { Field, ObjectType } from 'type-graphql'
import { FieldError } from '../utils/FieldError'

@ObjectType()
export class UserResponse {
	@Field(_type => String, { nullable: true })
	message?: string

	@Field(_type => [FieldError], { nullable: true })
	errors?: FieldError[]
}
