import { Box } from '@chakra-ui/react'
import { useAppSelector } from '../../../redux/store/hooks'
import PokemonMove from '../refactor/PokemonMove'
const PokemonMoves = () => {
	const pokemonMoves = useAppSelector(
		state => state.pokemonDetailReducer.pokemonDetail.pokemnMoves
	)

	return (
		<Box>
			{pokemonMoves.map((move, index) => (
				<PokemonMove key={index} {...move} />
			))}
		</Box>
	)
}

export default PokemonMoves
