import { Max, Min } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType('PokemonIvStatObject')
@InputType('PokemonIvStatInput')
export class PokemonIvStat {
	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(31)
	hpIv: number

	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(31)
	attackIv: number

	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(31)
	defendIv: number

	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(31)
	specialAttackIv: number

	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(31)
	specialDefendIv: number

	@Field({ defaultValue: 0 })
	@Min(0)
	@Max(31)
	speedIv: number
}
