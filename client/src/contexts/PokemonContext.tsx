import { useLazyQuery } from '@apollo/client'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { GET_POKEMONS } from '../graphql/pokemon/queries/GetPokemons'
import { SEARCH_POKEMON } from '../graphql/pokemon/queries/SearchPokemon'
import {
	loadPokemons,
	setNotFoundPokemon,
	setPokemons,
	setStorePokemonSearch
} from '../redux/slice/pokemon/pokemonSlice'
import {
	Pokemon,
	Pokemons,
	PokemonSearch
} from '../redux/slice/pokemon/types/Pokemons'
import { useAppDispatch, useAppSelector } from '../redux/store/hooks'

interface IPokemonContext {
	getPokemons: (type: 'get' | 'load', offset: number) => void
	searchPokemonFromApi: (name: string) => void
	searchPokemonFromStore: (name: string) => Pokemon | undefined
	isLoading: boolean
}

export const PokemonContext = createContext<IPokemonContext>({
	getPokemons: () => {},
	searchPokemonFromApi: () => {},
	searchPokemonFromStore: (): Pokemon | undefined => undefined,
	isLoading: false
})

export const usePokemonContext = () => useContext(PokemonContext)

const PokemonContextProvider = ({ children }: { children: ReactNode }) => {
	const dispatch = useAppDispatch()

	const [pokemons, { loading }] = useLazyQuery<
		{ pokemons: Pokemons },
		{ limit: number; offset: number }
	>(GET_POKEMONS)

	const isLoading = loading

	const getPokemons = (type: 'get' | 'load', offset: number) => {
		pokemons({
			context: {
				clientName: 'pokemon'
			},
			variables: {
				limit: 20,
				offset
			},
			onCompleted: data => {
				dispatch(
					type === 'get'
						? setPokemons({
								results: data.pokemons.results,
								nextOffset: data.pokemons.nextOffset
						  })
						: loadPokemons({
								results: data.pokemons.results,
								nextOffset: data.pokemons.nextOffset
						  })
				)
			}
		})
	}

	useEffect(() => {
		getPokemons('get', 0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const pokemonList = useAppSelector(
		state => state.pokemonReducer.pokemonList.pokemons
	)

	const searchPokemonFromStore = (name: string) => {
		const existingPokemon = pokemonList.find(poke => poke.name === name)

		return existingPokemon
	}

	const [pokemon] = useLazyQuery<{ pokemon: PokemonSearch }, { name: string }>(
		SEARCH_POKEMON
	)

	const searchPokemonFromApi = (name: string) => {
		pokemon({
			context: {
				clientName: 'pokemon'
			},
			variables: {
				name
			},
			onCompleted: data => {
				const { id, name, sprites } = data.pokemon

				if (id) {
					const pokemon = {
						id,
						name,
						image: sprites.front_default
					} as Pokemon

					dispatch(setStorePokemonSearch(pokemon))
					dispatch(setNotFoundPokemon(false))
				} else dispatch(setNotFoundPokemon(true))
			}
		})
	}

	const pokemonContextData = {
		getPokemons,
		searchPokemonFromApi,
		searchPokemonFromStore,
		isLoading
	}

	return (
		<PokemonContext.Provider value={pokemonContextData}>
			{children}{' '}
		</PokemonContext.Provider>
	)
}

export default PokemonContextProvider
