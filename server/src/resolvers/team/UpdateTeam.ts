import { Team } from '../../entities/Team'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'
import { PokemonTeamInput } from '../../types/team/PokemonTeamInput'
import { UpdateTeamInput } from '../../types/team/UpdateTeamInput'
import { Context } from '../../types/utils/Context'
import { internalServerError } from '../../utils/InternalServerError'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

@Resolver()
export class UserUpdateTeamResolver {
	@Mutation(_return => TeamMutationResponse)
	async updateTeam(
		@Arg('updateTeamInput') updateTeamInput: UpdateTeamInput,
		@Arg('pokemons', _type => [PokemonTeamInput])
		pokemons: Array<PokemonTeamInput>,
		@Ctx() context: Context
	): Promise<TeamMutationResponse> {
		try {
			const { id, title, description } = updateTeamInput
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

			if (pokemons.length > 6)
				return {
					code: 400,
					success: false,
					message: 'Team too more pokemon',

					errors: [
						{
							field: 'pokemons',
							message: 'Teams can only contain up to 6 pokemon'
						}
					]
				}

			const checkEv = pokemons.every(poke => {
				const {
					hpEv,
					attackEv,
					defendEv,
					specialAttackEv,
					specialDefendEv,
					speedEv
				} = poke.ev

				const totalEv =
					hpEv +
					attackEv +
					defendEv +
					specialAttackEv +
					specialDefendEv +
					speedEv

				return totalEv <= 510
			})

			if (!checkEv)
				return {
					code: 400,
					success: false,
					message: 'Total ev too much',
					errors: [
						{
							field: 'iv',
							message: 'Total ev must less 510'
						}
					]
				}

			existingTeam.title = title ? title : existingTeam.title
			existingTeam.description = description
				? description
				: existingTeam.description
			existingTeam.pokemons = pokemons ? pokemons : existingTeam.pokemons

			await existingTeam.save()

			return {
				code: 200,
				success: true,
				message: 'Team updated successfully',
				team: existingTeam
			}
		} catch (error) {
			console.log(error)
			throw internalServerError(error)
		}
	}
}
