import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	PokemonAbility,
	PokemonInfo,
	PokemonMove,
	PokemonSprites
} from './types/pokemonDetail'

const pokemonDetailSlice = createSlice({
	name: 'pokemonDetail',
	initialState: {
		pokemonInfo: {} as PokemonInfo,
		pokemonSprite: {} as PokemonSprites,
		pokemonAbilities: [] as PokemonAbility[],
		pokemnMoves: [] as PokemonMove[]
	},
	reducers: {
		setPokemonInfo: (state, action: PayloadAction<PokemonInfo>) => {
			state.pokemonInfo = action.payload
		},
		setPokemonSprites: (state, action: PayloadAction<PokemonSprites>) => {
			state.pokemonSprite = action.payload
		},
		setPokemonAbilities: (state, action: PayloadAction<PokemonAbility[]>) => {
			state.pokemonAbilities = action.payload
		},
		setPokemonMoves: (state, action: PayloadAction<PokemonMove[]>) => {
			state.pokemnMoves = action.payload
		}
	}
})

export const {
	setPokemonInfo,
	setPokemonSprites,
	setPokemonAbilities,
	setPokemonMoves
} = pokemonDetailSlice.actions
export const pokemonDetailReducer = pokemonDetailSlice.reducer
