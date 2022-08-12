import { Field, ID, ObjectType } from 'type-graphql'
import { PokemonAbility } from './PokemonAbility'
import { PokemonEvStat } from './PokemonEvStat'
import { PokemonIvStat } from './PokemonIvStat'

@ObjectType()
export class Pokemon {
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
