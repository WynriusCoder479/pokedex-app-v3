import { gql } from '@apollo/client'
import {
	POKEMON_MOVES_FRAGMENT,
	POKEMON_MOVE_DETAIL_FRAGMENT
} from '../Fragment/PokemonMoves'

export const GET_POKEMON_MOVE_MACHINE = gql`
	${POKEMON_MOVES_FRAGMENT}
	${POKEMON_MOVE_DETAIL_FRAGMENT}
	query GetDetailPokemon($id: Int!) {
		pokemon_v2_pokemon_by_pk(id: $id) {
			pokemon_v2_pokemonmoves(
				where: {
					pokemon_v2_versiongroup: { generation_id: { _eq: 8 } }
					pokemon_v2_movelearnmethod: { name: { _eq: "machine" } }
				}
			) {
				...pokemonMoves
				pokemon_v2_move {
					...pokemonMoveDetail
					pokemon_v2_machines(
						where: { pokemon_v2_versiongroup: { generation_id: { _eq: 8 } } }
						order_by: { machine_number: asc }
					) {
						machine_number
					}
				}
			}
		}
	}
`
