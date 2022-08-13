import { useLazyQuery } from '@apollo/client'
import { createContext, ReactNode, useContext } from 'react'
import { SEARCH_POKEMON } from '../graphql/pokemon/queries/SearchPokemon'
import { GET_POKEMON_DETAIL } from '../graphql/pokemonDetail/queries/GetPokemonDetail'
import { PokemonDetail } from '../graphql/pokemonDetail/types/PokemonDetail'
import { PokemonSearch } from '../redux/slice/pokemon/types/Pokemons'
import {
	setPokemonAbilities,
	setPokemonInfo,
	setPokemonMoves,
	setPokemonSprites
} from '../redux/slice/pokemonDetail/pokemonDetailSlice'
import {
	PokemonAbility,
	PokemonMove
} from '../redux/slice/pokemonDetail/types/pokemonDetail'
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

				const pokemonAbilities: PokemonAbility[] = []

				data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonabilities.forEach(
					ability => {
						pokemonAbilities.push({
							name: ability.pokemon_v2_ability.name,
							isHidden: ability.is_hidden,
							effect:
								ability.pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0]
									.short_effect
						})
					}
				)

				const pokemonsMoves: PokemonMove[] = []

				data.pokemon_v2_pokemon_by_pk.pokemon_v2_pokemonmoves.forEach(move => {
					pokemonsMoves.push({
						name: move.pokemon_v2_move.name,
						level: move.level,
						damageClass: move.pokemon_v2_move.pokemon_v2_movedamageclass.name,
						pp: move.pokemon_v2_move.pp,
						power: move.pokemon_v2_move.power,
						effect:
							move.pokemon_v2_move.pokemon_v2_moveeffect
								.pokemon_v2_moveeffecteffecttexts[0].short_effect
					})
				})

				dispatch(setPokemonAbilities(pokemonAbilities))
				dispatch(setPokemonMoves(pokemonsMoves))
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
