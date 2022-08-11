import { Team } from '../../entities/Team'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'
import { Context } from '../../types/utils/Context'
import { internalServerError } from '../../utils/InternalServerError'
import { Arg, Ctx, ID, Query, Resolver, UseMiddleware } from 'type-graphql'
import { checkAuth } from '../../middleware/checkAuth'

@Resolver()
export class UserGetSingleTeamResolver {
	@Query(_return => TeamMutationResponse)
	@UseMiddleware(checkAuth)
	async getSingleTeam(
		@Arg('id', _type => ID) id: number,
		@Ctx() context: Context
	): Promise<TeamMutationResponse> {
		try {
			const { req } = context

			const existingTeam = await Team.findOne({
				where: {
					userId: req.session.userId,
					id
				}
			})

			if (!existingTeam)
				return {
					code: 400,
					success: false,
					message: 'Team not found'
				}

			return {
				code: 200,
				success: true,
				message: 'Get team successfully',
				team: existingTeam
			}
		} catch (error) {
			console.log(error)
			throw internalServerError(error)
		}
	}
}
