import { User } from '../../entities/User'
import { Field, ObjectType } from 'type-graphql'
import { IResponse } from './Response'
import { FieldError } from '../util/FieldError'

@ObjectType({ implements: IResponse })
export class UserMutationResponse implements IResponse {
	code: number
	success: boolean
	message?: string

	@Field(_type => User, { nullable: true })
	user?: User

	@Field(_type => String, { nullable: true })
	accessToken?: string

	@Field(_type => String, { nullable: true })
	refreshToken?: string

	@Field(_type => [FieldError], { nullable: true })
	errors?: FieldError[]
}
