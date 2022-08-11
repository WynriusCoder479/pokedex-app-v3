import { Team } from '../../entities/Team'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'
import { CreateTeamInput } from '../../types/team/CreateTeamInput'
import { PokemonTeamInput } from '../../types/team/PokemonTeamInput'
import { Context } from '../../types/utils/Context'
import { internalServerError } from '../../utils/InternalServerError'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { checkAuth } from '../../middleware/checkAuth'

@Resolver()
export class UserCreateTeamResolver {
	@Mutation(_return => TeamMutationResponse)
	@UseMiddleware(checkAuth)
	async createTeam(
		@Arg('createTeamInput') createTeamInput: CreateTeamInput,
		@Arg('pokemons', _type => [PokemonTeamInput])
		pokemons: Array<PokemonTeamInput>,
		@Ctx() context: Context
	): Promise<TeamMutationResponse> {
		try {
			const { title, description } = createTeamInput

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

			const { req } = context

			const newTeam = Team.create({
				title,
				description,
				pokemons,
				userId: req.session.userId
			})

			await newTeam.save()

			return {
				code: 200,
				success: true,
				message: 'Create team succeccfully',
				team: newTeam
			}
		} catch (error) {
			console.log(error)
			throw internalServerError(error)
		}
	}
}
