import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/routing/ProtectedRoute'
import AuthContextProvider from './contexts/AuthContext'
import PokemonContextProvider from './contexts/PokemonContext'
import PokemonDetailContextProvider from './contexts/PokemonDetailContext'
import Auth from './pages/Auth'
import Calculator from './pages/Calculator'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Profile from './pages/Profile'
import { Team } from './pages/Team'

function App() {
	return (
		<AuthContextProvider>
			<PokemonContextProvider>
				<PokemonDetailContextProvider>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<Home />} />
							<Route path='calculator' element={<Calculator />} />
							<Route path='team' element={<ProtectedRoute />}>
								<Route path='' element={<Team />} />
							</Route>
							<Route path='profile' element={<Profile />}>
								<Route path='' element={<Profile />} />
							</Route>
						</Route>
						<Route path='/login' element={<Auth authRoute='login' />} />
						<Route path='/register' element={<Auth authRoute='register' />} />
					</Routes>
				</PokemonDetailContextProvider>
			</PokemonContextProvider>
		</AuthContextProvider>
	)
}

export default App
