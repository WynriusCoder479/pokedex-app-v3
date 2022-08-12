import { Team } from '../../entities/Team'
import { checkAuth } from '../../middleware/checkAuth'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'
import { Context } from '../../types/util/Context'
import { Arg, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { In } from 'typeorm'

@Resolver()
export class UserRemoveMultipleTeamResolver {
	@Mutation(_return => TeamMutationResponse)
	@UseMiddleware(checkAuth)
	async removeMultipleTeam(
		@Arg('idArray', _type => [ID]) idArray: Array<number>,
		@Ctx() context: Context
	): Promise<TeamMutationResponse> {
		try {
			const { req } = context

			const existingTeams = await Team.find({
				where: {
					userId: req.session.userId,
					id: In(idArray)
				}
			})

			if (!existingTeams)
				return {
					code: 400,
					success: false,
					message: 'User has not team'
				}

			existingTeams.forEach(team => team.remove())

			return {
				code: 200,
				success: true,
				message: 'Remove all team has choice successfully'
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
