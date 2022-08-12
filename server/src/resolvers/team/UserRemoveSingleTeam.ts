import { Team } from '../../entities/Team'
import { checkAuth } from '../../middleware/checkAuth'

import { Context } from '../../types/util/Context'
import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'

@Resolver()
export class UserRemoveSingleTeamResolver {
	@Mutation(_return => TeamMutationResponse)
	@UseMiddleware(checkAuth)
	async removeSingleTeam(
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

			await existingTeam.remove()

			return {
				code: 200,
				success: true,
				message: 'Team remove successfully'
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
