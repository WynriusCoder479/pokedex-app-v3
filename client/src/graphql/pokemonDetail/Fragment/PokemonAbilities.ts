import { gql } from '@apollo/client'

const POKEMON_ABILITY_EFFECT_FRAGMENT = gql`
	fragment pokemonAbilityEffect on pokemon_v2_abilityeffecttext {
		short_effect
	}
`

export const POKEMON_ABILITY_FRAGMENT = gql`
	${POKEMON_ABILITY_EFFECT_FRAGMENT}
	fragment pokemonAbilities on pokemon_v2_pokemonability {
		pokemon_v2_ability {
			name
			pokemon_v2_abilityeffecttexts(where: { language_id: { _eq: 9 } }) {
				...pokemonAbilityEffect
			}
		}
	}
`
