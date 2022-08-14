import { Box } from '@chakra-ui/react'
import { useAppSelector } from '../../../redux/store/hooks'
import PokemonAbility from '../refactor/PokemonAbility'

const PokemonAbilities = () => {
	const pokemonAbilities = useAppSelector(
		state => state.pokemonDetailReducer.pokemonDetail.pokemonAbilities
	)
	return (
		<Box>
			{pokemonAbilities.map((ability, index) => (
				<PokemonAbility key={index} {...ability} />
			))}
		</Box>
	)
}

export default PokemonAbilities
