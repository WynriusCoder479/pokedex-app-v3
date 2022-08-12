import { Max, Min } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType('PokemonEvStatObject')
@InputType('PokemonEvStatInput')
export class PokemonEvStat {
	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(255)
	hpEv: number

	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(255)
	attackEv: number

	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(255)
	defendEv: number

	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(255)
	specialAttackEv: number

	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(255)
	specialDefendEv: number

	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(255)
	speedEv: number
}
