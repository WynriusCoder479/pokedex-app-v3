import { Field, ID, InputType } from 'type-graphql'
import { PokemonAbility } from '../pokemons/PokemonAbility'
import { PokemonEvStat } from '../pokemons/PokemonEvStat'
import { PokemonIvStat } from '../pokemons/PokemonIvStat'

@InputType()
export class PokemonTeamInput {
	@Field(_type => ID)
	id!: number

	@Field(_type => String)
	name!: string

	@Field(_type => PokemonAbility)
	ability: PokemonAbility

	@Field(_type => PokemonIvStat)
	iv: PokemonIvStat

	@Field(_type => PokemonEvStat)
	ev: PokemonEvStat
}
