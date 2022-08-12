import { Team } from '../../entities/Team'
import { checkAuth } from '../../middleware/checkAuth'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'
import { PokemonTeamInput } from '../../types/Team/PokemonTeamInput'
import { UpdateTeamInput } from '../../types/Team/UpdateTeamInput'
import { Context } from '../../types/util/Context'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

@Resolver()
export class UserUpdateTeamResolver {
	@Mutation(_return => TeamMutationResponse)
	@UseMiddleware(checkAuth)
	async updateTeam(
		@Arg('updateTeamInput') updateTeamInput: UpdateTeamInput,
		@Arg('pokemons', () => [PokemonTeamInput])
		pokemons: Array<PokemonTeamInput>,
		@Ctx() context: Context
	): Promise<TeamMutationResponse> {
		try {
			const { id, title, description } = updateTeamInput

			const existingTeam = await Team.findOneBy({ id })

			if (!existingTeam)
				return {
					code: 400,
					success: false,
					message: 'Team not found'
				}

			const { req } = context

			if (existingTeam.userId !== req.session.userId)
				return {
					code: 400,
					success: false,
					message: 'Unauthorised'
				}

			if (pokemons.length > 6)
				return {
					code: 400,
					success: false,
					message: 'Total ev too much',
					errors: [
						{
							field: 'ev',
							message: 'Total ev <= 510'
						}
					]
				}

			existingTeam.title = title
			existingTeam.description = description
			existingTeam.pokemons = pokemons

			await existingTeam.save()

			return {
				code: 200,
				success: true,
				message: 'Updated team successfully',
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
