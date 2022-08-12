import { useLazyQuery, useMutation } from '@apollo/client'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_LOGIN } from '../graphql/auth/mutations/UserLogin'
import { USER_LOGOUT } from '../graphql/auth/mutations/UserLogout'
import { USER_REGISTER } from '../graphql/auth/mutations/UserRegister'
import { USER_CHECK_AUTH } from '../graphql/auth/queries/UserCheckAuth'
import { LoginInput, RegisterInput } from '../graphql/auth/types/UserInput'
import { UserMutationResponse } from '../graphql/auth/types/UserMutationResponse'
import { setAuth } from '../redux/slice/auth/authSlice'
import { useAppDispatch } from '../redux/store/hooks'

interface IAuthContext {
	userRegister: (registerInput: RegisterInput) => void
	userLogin: (loginInput: LoginInput) => void
	userLogout: () => void
	userCheckAuth: () => void
}

export const AuthContext = createContext<IAuthContext>({
	userRegister: () => {},
	userLogin: () => {},
	userLogout: () => {},
	userCheckAuth: () => {}
})

export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const [register] = useMutation<
		{ register: UserMutationResponse },
		{ registerInput: RegisterInput }
	>(USER_REGISTER)

	const userRegister = (registerInput: RegisterInput) => {
		const { username, email, password } = registerInput
		register({
			variables: {
				registerInput: {
					username,
					email,
					password
				}
			},
			onCompleted: data => {
				if (data.register.success) {
					dispatch(
						setAuth({
							isAuthenticated: true,
							isLoading: false
						})
					)

					navigate('/')
				}
			}
		})
	}

	const [login] = useMutation<
		{ login: UserMutationResponse },
		{ loginInput: LoginInput }
	>(USER_LOGIN)

	const userLogin = (loginInput: LoginInput) => {
		login({
			variables: {
				loginInput: {
					...loginInput
				}
			},
			onCompleted: data => {
				if (data.login.success) {
					dispatch(
						setAuth({
							isAuthenticated: true,
							isLoading: false
						})
					)

					navigate('/')
				}
			}
		})
	}

	const [logout] = useMutation<{ logout: boolean }>(USER_LOGOUT)

	const userLogout = () => {
		logout({
			onCompleted: data => {
				if (data.logout) {
					dispatch(
						setAuth({
							isAuthenticated: false,
							isLoading: true
						})
					)
				}
			}
		})
	}

	const [checkAuth] = useLazyQuery<{
		checkAuth: UserMutationResponse
	}>(USER_CHECK_AUTH)

	const userCheckAuth = () => {
		checkAuth({
			onCompleted: data => {
				if (data?.checkAuth.success) {
					dispatch(
						setAuth({
							isAuthenticated: true,
							isLoading: false
						})
					)

					navigate('/')
				}
			}
		})
	}

	useEffect(() => {
		userCheckAuth()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const authContextData = {
		userRegister,
		userLogin,
		userLogout,
		userCheckAuth
	}

	return (
		<AuthContext.Provider value={authContextData}>
			{children}{' '}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
