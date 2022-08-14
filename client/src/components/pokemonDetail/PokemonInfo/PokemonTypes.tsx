import { Box, Flex, Text } from '@chakra-ui/react'
import { useAppSelector } from '../../../redux/store/hooks'
import PokemonInfoWrapper from '../refactor/PokemonInfoWrapper'
import PokemonType from '../refactor/PokemonType'

const PokemonTypes = () => {
	const pokemonDetail = useAppSelector(state => state.pokemonDetailReducer)
	const { pokemonInfo } = pokemonDetail.pokemonDetail

	return (
		<PokemonInfoWrapper>
			<Box textAlign={'center'}>
				<Text fontSize={'2xl'} mb={'10px'} color={'black'}>
					Type
				</Text>
				<Flex>
					<PokemonType type={pokemonInfo.primaryType} />
					{pokemonInfo.secondaryType !== '' && (
						<PokemonType type={pokemonInfo.secondaryType} />
					)}
				</Flex>
			</Box>
		</PokemonInfoWrapper>
	)
}

export default PokemonTypes
