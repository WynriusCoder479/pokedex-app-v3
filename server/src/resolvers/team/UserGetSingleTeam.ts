import { Team } from '../../entities/Team'
import { checkAuth } from '../../middleware/checkAuth'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'
import { Context } from '../../types/util/Context'
import { Arg, Ctx, ID, Query, Resolver, UseMiddleware } from 'type-graphql'

@Resolver()
export class UserGetSingleTeamResolvser {
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
					message: 'Team not found',

					errors: [
						{
							field: 'team',
							message: 'Team not exist'
						}
					]
				}

			return {
				code: 200,
				success: true,
				message: 'Get team successfully',
				team: existingTeam
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
