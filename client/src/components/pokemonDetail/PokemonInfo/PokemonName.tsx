import { Text } from '@chakra-ui/react'
import { useAppSelector } from '../../../redux/store/hooks'
import PokemonInfoWrapper from '../refactor/PokemonInfoWrapper'

const PokemonName = () => {
	const pokemonDetail = useAppSelector(state => state.pokemonDetailReducer)
	const { pokemonInfo } = pokemonDetail.pokemonDetail

	return (
		<PokemonInfoWrapper>
			<Text fontSize={'3xl'} color={'black'}>
				#{pokemonInfo.id}{' '}
				{pokemonInfo.name.charAt(0).toLocaleUpperCase() +
					pokemonInfo.name.slice(1)}
			</Text>
		</PokemonInfoWrapper>
	)
}

export default PokemonName
