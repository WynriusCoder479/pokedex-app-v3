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
	damageClass: string
	effect: string
}
