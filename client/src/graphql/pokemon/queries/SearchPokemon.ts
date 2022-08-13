import { gql } from '@apollo/client'

export const SEARCH_POKEMON = gql`
	query getPokemonSprites($name: String!) {
		pokemon(name: $name) {
			id
			name
			sprites {
				front_default
				front_shiny
			}
		}
	}
`
