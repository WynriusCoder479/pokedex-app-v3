import { Field, ID, InputType } from 'type-graphql'
import { PokemonAbility } from './PokemonAbility'
import { PokemonEvStat } from './PokemonEvStat'
import { PokemonIvStat } from './PokemonIvStat'

@InputType()
export class PokemonTeamInput {
	@Field(_type => ID)
	id: number

	@Field(_type => String)
	name: string

	@Field(_type => PokemonIvStat)
	iv: PokemonIvStat

	@Field(_type => PokemonEvStat)
	ev: PokemonEvStat

	@Field(_type => PokemonAbility)
	ability: PokemonAbility
}
