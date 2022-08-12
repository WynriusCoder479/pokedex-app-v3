import { gql } from '@apollo/client'

export const POKEMON_TYPE_FRAGMENT = gql`
	fragment pokemonTypes on pokemon_v2_pokemontype {
		pokemon_v2_type {
			name
		}
	}
`
