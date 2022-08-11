import { Team } from '../../entities/Team'
import { checkAuth } from '../../middleware/checkAuth'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'
import { Context } from '../../types/utils/Context'
import { internalServerError } from '../../utils/InternalServerError'
import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'

@Resolver()
export class UserRemoveTeamResolver {
	@Mutation(_return => TeamMutationResponse)
	@UseMiddleware(checkAuth)
	async removeTeam(
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
				message: 'Team removed successfully'
			}
		} catch (error) {
			console.log(error)
			throw internalServerError(error)
		}
	}
}
