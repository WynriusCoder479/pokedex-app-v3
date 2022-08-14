export interface PokemonInfo {
	id: number
	name: string
	primaryType: string
	secondaryType: string
}

export interface PokemonSprites {
	front: string
	shiny: string
}

export interface PokemonAbility {
	name: string
	isHidden: boolean
	effect: string
}

export interface PokemonMove {
	name: string
	level: number
	pp: number
	power: number | null
	accuracy: number
	type: string
	damageClass: string
	effect: string
}

export interface PokemonStat {
	hp: number
	attack: number
	defense: number
	special_attack: number
	special_defense: number
	speed: number
}
