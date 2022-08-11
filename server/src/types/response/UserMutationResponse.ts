import { User } from '../../entities/User'
import { Field, ObjectType } from 'type-graphql'
import { IResponse } from './Response'
import { FieldError } from '../utils/FieldError'

@ObjectType({ implements: IResponse })
export class UserMutationResponse implements IResponse {
	code: number
	success: boolean
	message?: string

	@Field(_type => User, { nullable: true })
	user?: User

	@Field(_type => [FieldError], { nullable: true })
	errors?: FieldError[]
}
