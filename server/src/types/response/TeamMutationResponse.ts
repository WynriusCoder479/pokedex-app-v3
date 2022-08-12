import { Team } from '../../entities/Team'
import { Field, ObjectType } from 'type-graphql'
import { IResponse } from './Response'
import { FieldError } from '../util/FieldError'

@ObjectType({ implements: IResponse })
export class TeamMutationResponse implements IResponse {
	code: number
	success: boolean
	message?: string

	@Field(_type => Team, { nullable: true })
	team?: Team

	@Field(_type => [FieldError], { nullable: true })
	errors?: FieldError[]
}
