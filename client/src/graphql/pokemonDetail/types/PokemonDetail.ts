// pokemon type
export interface pokemonType {
	pokemon_v2_type: {
		name: string
	}
}

// pokemon ability
export interface pokemonAbilityDetail {
	name: string
	pokemon_v2_abilityeffecttexts: [{ short_effect: string }]
}

export interface pokemonAbility {
	pokemon_v2_ability: pokemonAbilityDetail
	is_hidden: boolean
}

//pokemon stat
export interface pokemonStatName {
	name: string
}

export interface pokemonStat {
	pokemon_v2_stat: pokemonStatName
	base_stat: number
}

// pokemon move
export interface pokemonMoveDamageClass {
	name: string
}

export interface pokemonMoveType {
	name: string
}

export interface pokemonMoveEffect {
	pokemon_v2_moveeffecteffecttexts: [{ short_effect: string }]
}

export interface pokemonMoveDetail {
	name: string
	pp: number
	power: number | null
	accuracy: number
	pokemon_v2_type: pokemonMoveType
	pokemon_v2_movedamageclass: pokemonMoveDamageClass
	pokemon_v2_moveeffect: pokemonMoveEffect
}

export interface pokemonMove {
	level: number
	pokemon_v2_move: pokemonMoveDetail
}

// ====>
export interface PokemonDetail {
	pokemon_v2_pokemon_by_pk: {
		id: number
		name: string
		pokemon_v2_pokemontypes: pokemonType[]
		pokemon_v2_pokemonabilities: pokemonAbility[]
		pokemon_v2_pokemonstats: pokemonStat[]
		pokemon_v2_pokemonmoves: pokemonMove[]
	}
}
