import { gql } from '@apollo/client'
import { POKEMON_ABILITY_FRAGMENT } from '../Fragment/PokemonAbilities'
import { POKEMON_MOVES_FRAGMENT } from '../Fragment/PokemonMoves'
import { POKEMON_STATS_FRAGMENT } from '../Fragment/PokemonStats'
import { POKEMON_TYPE_FRAGMENT } from '../Fragment/PokemonTypes'

export const GET_POKEMON_DETAIL = gql`
	${POKEMON_TYPE_FRAGMENT}
	${POKEMON_ABILITY_FRAGMENT}
	${POKEMON_STATS_FRAGMENT}
	${POKEMON_MOVES_FRAGMENT}
	query GetDetailPokemon($id: Int!) {
		pokemon_v2_pokemon_by_pk(id: $id) {
			id
			name
			pokemon_v2_pokemontypes {
				...pokemonTypes
			}
			pokemon_v2_pokemonabilities {
				...pokemonAbilities
				is_hidden
			}
			pokemon_v2_pokemonstats {
				...pokemonStats
				base_stat
			}
			pokemon_v2_pokemonmoves(
				where: {
					pokemon_v2_versiongroup: { generation_id: { _eq: 8 } }
					pokemon_v2_movelearnmethod: { name: { _eq: "level-up" } }
				}
				order_by: { level: asc }
			) {
				level
				...pokemonMoves
			}
		}
	}
`
