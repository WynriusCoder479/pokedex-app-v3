export interface Pokemon {
	id: number
	name: string
	image: string
}

export interface Pokemons {
	results: [Pokemon]
	nextOffset: number
}

interface PokemonImage {
	front_default: string
	front_shiny: string
}

export interface PokemonSearch {
	id: number
	name: string
	sprites: PokemonImage
}
