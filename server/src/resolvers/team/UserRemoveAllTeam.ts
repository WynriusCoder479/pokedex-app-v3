import { Team } from '../../entities/Team'
import { checkAuth } from '../../middleware/checkAuth'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'
import { Context } from '../../types/util/Context'
import { Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

@Resolver()
export class UserRemoveAllTeamResolver {
	@Mutation(_return => TeamMutationResponse)
	@UseMiddleware(checkAuth)
	async removeAllTeam(@Ctx() context: Context): Promise<TeamMutationResponse> {
		try {
			const { req } = context

			const existingTeams = await Team.findBy({ userId: req.session.userId })

			if (!existingTeams)
				return {
					code: 400,
					success: false,
					message: 'User has not teams'
				}

			existingTeams.forEach(team => team.remove())

			return {
				code: 200,
				success: true,
				message: 'Remove all team successfully'
			}
		} catch (error) {
			console.log(error)
			return {
				code: 500,
				success: false,
				message: `Internal server error ${error.message}`
			}
		}
	}
}
