import { Team } from '../../entities/Team'
import { checkAuth } from '../../middleware/checkAuth'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'
import { Context } from '../../types/utils/Context'
import { internalServerError } from '../../utils/InternalServerError'
import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { In } from 'typeorm'

@Resolver()
export class UserRemoverMultipleTeamResolver {
	@Mutation(_return => TeamMutationResponse)
	@UseMiddleware(checkAuth)
	async removeMultipleTeam(
		@Arg('id', _type => [ID]) id: Array<number>,
		@Ctx() context: Context
	): Promise<TeamMutationResponse> {
		try {
			const { req } = context

			const existingTeams = await Team.find({
				where: {
					userId: req.session.userId,
					id: In<number>(id)
				}
			})

			if (!existingTeams)
				return {
					code: 400,
					success: false,
					message: 'Teams not found'
				}

			existingTeams.forEach(team => team.remove())

			return {
				code: 200,
				success: true,
				message: 'Remove team successfully'
			}
		} catch (error) {
			console.log(error)
			throw internalServerError(error)
		}
	}
}
