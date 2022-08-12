import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType('PokemonAbilityObject')
@InputType('PokemonAbilityInput')
export class PokemonAbility {
	@Field(_type => String)
	name: string

	@Field(_type => Boolean)
	isHidden: boolean

	@Field(_type => String)
	effect: string
}
