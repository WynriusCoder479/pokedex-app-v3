import { Box } from '@chakra-ui/react'
import { useAppSelector } from '../../../redux/store/hooks'
import PokemonMoveMachine from '../refactor/PokemonMoveMachine'

const PokemonMoveMachines = () => {
	const PokemonMoveMachines = useAppSelector(
		state => state.pokemonDetailReducer.pokemonDetail.pokemonMovesMachine
	)

	return (
		<Box>
			{PokemonMoveMachines.map((move, index) => (
				<PokemonMoveMachine key={index} {...move} />
			))}
		</Box>
	)
}

export default PokemonMoveMachines
