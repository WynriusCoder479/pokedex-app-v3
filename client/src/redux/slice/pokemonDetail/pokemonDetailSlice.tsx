import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PokemonInfo, PokemonSprites } from './types/pokemonDetail'

const pokemonDetailSlice = createSlice({
	name: 'pokemonDetail',
	initialState: {
		pokemonInfo: {} as PokemonInfo,
		pokemonSprite: {} as PokemonSprites,
		pokemonAbilities: [],
		pokemnMoves: []
	},
	reducers: {
		setPokemonInfo: (state, action: PayloadAction<PokemonInfo>) => {
			state.pokemonInfo = action.payload

			console.log(state.pokemonInfo)
		},
		setPokemonSprites: (state, action: PayloadAction<PokemonSprites>) => {
			state.pokemonSprite = action.payload

			console.log(state.pokemonSprite)
		}
	}
})

export const { setPokemonInfo, setPokemonSprites } = pokemonDetailSlice.actions
export const pokemonDetailReducer = pokemonDetailSlice.reducer
