import { Team } from '../../entities/Team'
import { AllTeamQueryResponse } from '../../types/response/AllTeamQueryResponse'
import { Context } from '../../types/utils/Context'
import { internalServerError } from '../../utils/InternalServerError'
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { checkAuth } from '../../middleware/checkAuth'

@Resolver()
export class UserGetAllTeamResolver {
	@Query(_return => AllTeamQueryResponse)
	@UseMiddleware(checkAuth)
	async getAllTeam(@Ctx() context: Context): Promise<AllTeamQueryResponse> {
		try {
			const { req } = context

			const existingTeams = await Team.findBy({ userId: req.session.userId })

			if (!existingTeams)
				return {
					code: 400,
					success: false,
					message: 'Teams not found',
					errors: [
						{
							field: 'teams',
							message: 'User has not teams'
						}
					]
				}

			return {
				code: 200,
				success: true,
				message: 'Get all team successfully',
				teams: existingTeams
			}
		} catch (error) {
			console.log(error)
			throw internalServerError(error)
		}
	}
}
