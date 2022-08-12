import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authState } from './types/authState'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		auth: {
			isAuthenticated: false,
			isLoading: true
		} as authState
	},
	reducers: {
		setAuth: (state, action: PayloadAction<authState>) => {
			state.auth.isAuthenticated = action.payload.isAuthenticated
			state.auth.isLoading = action.payload.isLoading
		}
	}
})

export const { setAuth } = authSlice.actions
export const authReducer = authSlice.reducer
