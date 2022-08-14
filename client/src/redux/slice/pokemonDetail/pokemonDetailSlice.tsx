import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	PokemonAbility,
	PokemonInfo,
	PokemonMove,
	PokemonSprites,
	PokemonStat
} from './types/pokemonDetail'

interface PokemonDetail {
	pokemonInfo: PokemonInfo
	pokemonSprite: PokemonSprites
	pokemonStat: PokemonStat
	pokemonAbilities: PokemonAbility[]
	pokemnMoves: PokemonMove[]
}

const pokemonDetailSlice = createSlice({
	name: 'pokemonDetail',
	initialState: {
		pokemonDetail: {
			pokemonInfo: {} as PokemonInfo,
			pokemonSprite: {} as PokemonSprites,
			pokemonStat: {} as PokemonStat,
			pokemonAbilities: [],
			pokemnMoves: []
		} as PokemonDetail,
		isLoading: true
	},
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		setPokemonInfo: (state, action: PayloadAction<PokemonInfo>) => {
			state.pokemonDetail.pokemonInfo = action.payload
		},
		setPokemonSprites: (state, action: PayloadAction<PokemonSprites>) => {
			state.pokemonDetail.pokemonSprite = action.payload
		},
		setPokemonStat: (state, action: PayloadAction<PokemonStat>) => {
			state.pokemonDetail.pokemonStat = action.payload
		},
		setPokemonAbilities: (state, action: PayloadAction<PokemonAbility[]>) => {
			state.pokemonDetail.pokemonAbilities = action.payload
		},
		setPokemonMoves: (state, action: PayloadAction<PokemonMove[]>) => {
			state.pokemonDetail.pokemnMoves = action.payload
		}
	}
})

export const {
	setLoading,
	setPokemonInfo,
	setPokemonSprites,
	setPokemonStat,
	setPokemonAbilities,
	setPokemonMoves
} = pokemonDetailSlice.actions
export const pokemonDetailReducer = pokemonDetailSlice.reducer
