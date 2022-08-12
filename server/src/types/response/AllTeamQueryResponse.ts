import { Team } from '../../entities/Team'
import { Field, ObjectType } from 'type-graphql'
import { IResponse } from './Response'
import { FieldError } from '../util/FieldError'

@ObjectType({ implements: IResponse })
export class AllTeamQueryResponse implements IResponse {
	code: number
	success: boolean
	message?: string

	@Field(_type => [Team], { nullable: true })
	teams?: Team[]

	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[]
}
