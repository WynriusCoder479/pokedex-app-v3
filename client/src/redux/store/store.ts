import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { authReducer } from '../slice/auth/authSlice'
import { pokemonReducer } from '../slice/pokemon/pokemonSlice'
import { pokemonDetailReducer } from '../slice/pokemonDetail/pokemonDetailSlice'

export const store = configureStore({
	reducer: {
		authReducer,
		pokemonReducer,
		pokemonDetailReducer
	}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
