import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
	query getPokemon($limit: Int, $offset: Int) {
		pokemons(limit: $limit, offset: $offset) {
			results {
				id
				name
				image
			}
			nextOffset
		}
	}
`
