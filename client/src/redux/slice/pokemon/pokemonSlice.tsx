import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pokemon, Pokemons } from './types/Pokemons'

interface pokemonState {
	pokemons: Pokemon[]
	nextOffset: number
}

const pokemoSlice = createSlice({
	name: 'pokemon',
	initialState: {
		pokemonList: {
			pokemons: [],
			nextOffset: 0
		} as pokemonState,

		storeSearchPokemon: {} as Pokemon,

		isShowSearchPokemon: false as boolean,

		isNotFoundPokemon: false as boolean
	},
	reducers: {
		setPokemons: (state, action: PayloadAction<Pokemons>) => {
			state.pokemonList.pokemons = action.payload.results
			state.pokemonList.nextOffset = action.payload.nextOffset
		},
		loadPokemons: (state, action: PayloadAction<Pokemons>) => {
			action.payload.results.forEach(poke =>
				state.pokemonList.pokemons.push(poke)
			)
			state.pokemonList.nextOffset = action.payload.nextOffset
		},
		setStorePokemonSearch: (state, action: PayloadAction<Pokemon>) => {
			state.storeSearchPokemon.id = action.payload.id
			state.storeSearchPokemon.name = action.payload.name
			state.storeSearchPokemon.image = action.payload.image

			state.isShowSearchPokemon = true
		},
		setShowSearchPokemon: (state, action: PayloadAction<boolean>) => {
			state.isShowSearchPokemon = action.payload
		},
		setNotFoundPokemon: (state, action: PayloadAction<boolean>) => {
			state.isNotFoundPokemon = action.payload

			state.isShowSearchPokemon = true
		}
	}
})

export const {
	setPokemons,
	loadPokemons,
	setStorePokemonSearch,
	setShowSearchPokemon,
	setNotFoundPokemon
} = pokemoSlice.actions
export const pokemonReducer = pokemoSlice.reducer
