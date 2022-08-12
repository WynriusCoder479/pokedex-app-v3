import { gql } from '@apollo/client'

export const POKEMON_STATS_FRAGMENT = gql`
	fragment pokemonStats on pokemon_v2_pokemonstat {
		pokemon_v2_stat {
			name
		}
	}
`
