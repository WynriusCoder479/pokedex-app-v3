import { Team } from '../../entities/Team'
import { checkAuth } from '../../middleware/checkAuth'
import { TeamMutationResponse } from '../../types/response/TeamMutationResponse'
import { CreateTeamInput } from '../../types/Team/CreateTeamInput'
import { PokemonTeamInput } from '../../types/Team/PokemonTeamInput'
import { Context } from '../../types/util/Context'
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'

@Resolver()
export class UserCreateTeamResolver {
	@Mutation(_return => TeamMutationResponse)
	@UseMiddleware(checkAuth)
	async createTeam(
		@Arg('createTeamInput') createTeamInput: CreateTeamInput,
		@Arg('pokemons', () => [PokemonTeamInput])
		pokemons: Array<PokemonTeamInput>,
		@Ctx() context: Context
	): Promise<TeamMutationResponse> {
		try {
			const { title, description } = createTeamInput

			if (pokemons.length > 6)
				return {
					code: 400,
					success: false,
					message: 'Team has too many pokemon',
					errors: [
						{
							field: 'pokemons',
							message: 'A team can only have a maximum of 6 members'
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
							field: 'ev',
							message: 'Total ev <= 510'
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
				message: 'Team created successfully',
				team: newTeam
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
