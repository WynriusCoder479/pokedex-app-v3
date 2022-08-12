import { Team } from '../../entities/Team'
import { checkAuth } from '../../middleware/checkAuth'
import { AllTeamQueryResponse } from '../../types/response/AllTeamQueryResponse'
import { Context } from '../../types/util/Context'
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'

@Resolver()
export class UserGetAllTeamResolver {
	@Query(_return => AllTeamQueryResponse)
	@UseMiddleware(checkAuth)
	async getAllTeam(@Ctx() context: Context): Promise<AllTeamQueryResponse> {
		try {
			const { req } = context

			const teams = await Team.findBy({ userId: req.session.userId })

			if (teams.length === 0)
				return {
					code: 400,
					success: false,
					message: 'User has not team',

					errors: [
						{
							field: 'teams',
							message: 'User has not team'
						}
					]
				}

			return {
				code: 200,
				success: true,
				message: 'Get all team successfully',
				teams
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
