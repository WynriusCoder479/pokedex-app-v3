import { gql } from '@apollo/client'

const POKEMON_MOVE_DETAIL_FRAGMENT = gql`
	fragment pokemonMoveDetail on pokemon_v2_move {
		name
		pp
		power
	}
`

const POKEMON_MOVE_DAMAGE_CLASS_FRAGMENT = gql`
	fragment pokemonMoveDamageClass on pokemon_v2_movedamageclass {
		name
	}
`

const POKEMON_MOVE_EFFECT_FRAGMENT = gql`
	fragment pokemonMoveEffect on pokemon_v2_moveeffect {
		pokemon_v2_moveeffecteffecttexts {
			short_effect
		}
	}
`

export const POKEMON_MOVES_FRAGMENT = gql`
	${POKEMON_MOVE_DETAIL_FRAGMENT}
	${POKEMON_MOVE_DAMAGE_CLASS_FRAGMENT}
	${POKEMON_MOVE_EFFECT_FRAGMENT}
	fragment pokemonMoves on pokemon_v2_pokemonmove {
		pokemon_v2_move {
			...pokemonMoveDetail
			pokemon_v2_movedamageclass {
				...pokemonMoveDamageClass
			}
			pokemon_v2_moveeffect {
				...pokemonMoveEffect
			}
		}
	}
`
