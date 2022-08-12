import { useLazyQuery } from '@apollo/client'
import { createContext, ReactNode, useContext } from 'react'
import { SEARCH_POKEMON } from '../graphql/pokemon/queries/SearchPokemon'
import { GET_POKEMON_DETAIL } from '../graphql/pokemonDetail/queries/GetPokemonDetail'
import { PokemonDetail } from '../graphql/pokemonDetail/types/PokemonDetail'
import { PokemonSearch } from '../redux/slice/pokemon/types/Pokemons'
import {
	setPokemonInfo,
	setPokemonSprites
} from '../redux/slice/pokemonDetail/pokemonDetailSlice'
import { useAppDispatch } from '../redux/store/hooks'

interface IPokemonDetailContext {
	getPokemonDetail: (id: number, name: string) => void
}

export const PokemonDetailContext = createContext<IPokemonDetailContext>({
	getPokemonDetail: () => {}
})

export const usePokemonDetailContext = () => useContext(PokemonDetailContext)

const PokemonDetailContextProvider = ({
	children
}: {
	children: ReactNode
}) => {
	const dispatch = useAppDispatch()

	const [pokemon_detail] = useLazyQuery<PokemonDetail, { id: number }>(
		GET_POKEMON_DETAIL
	)

	const [pokemon_sprite] = useLazyQuery<
		{ pokemon: PokemonSearch },
		{ name: string }
	>(SEARCH_POKEMON)

	const getPokemonDetail = (id: number, name: string) => {
		pokemon_detail({
			context: {
				clientName: 'pokemonV2'
			},
			variables: {
				id
			},
			onCompleted: data => {
				dispatch(
					setPokemonInfo({
						id: data.pokemon_v2_pokemon_by_pk.id,
						name: data.pokemon_v2_pokemon_by_pk.name,
						primaryType:
							data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemontypes[0]
								.pokemon_v2_type.name,
						secondaryType: data.pokemon_v2_pokemon_by_pk
							.pokemon_v2_pokemontypes[1]
							? data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemontypes[1]
									.pokemon_v2_type.name
							: ''
					})
				)
			}
		})

		pokemon_sprite({
			context: {
				clientName: 'pokemon'
			},
			variables: {
				name
			},
			onCompleted: data => {
				dispatch(
					setPokemonSprites({
						front: data.pokemon.sprites.front_default,
						shiny: data.pokemon.sprites.front_shiny
					})
				)
			}
		})
	}

	const pokemonDetailContextData = {
		getPokemonDetail
	}

	return (
		<PokemonDetailContext.Provider value={pokemonDetailContextData}>
			{children}{' '}
		</PokemonDetailContext.Provider>
	)
}

export default PokemonDetailContextProvider
