import { Box, Text } from '@chakra-ui/react'
import { useAppSelector } from '../../../redux/store/hooks'
import PokemonStat from '../refactor/PokemonStat'

const PokemonStats = () => {
	const stat = useAppSelector(
		state => state.pokemonDetailReducer.pokemonDetail.pokemonStat
	)

	const { hp, attack, defense, special_attack, special_defense, speed } = stat

	const stats = Object.values(stat)

	const totalStat = stats.reduce((accumalator, value) => accumalator + value, 0)

	return (
		<Box bg={'teal.400'} p={'10px'} rounded={'5px'} boxShadow={'lg'}>
			<PokemonStat title='HP' stat={hp} colorScheme={'blue'} />
			<PokemonStat title='Attack' stat={attack} colorScheme={'orange'} />
			<PokemonStat title='Defense' stat={defense} colorScheme={'blue'} />
			<PokemonStat
				title='Sp Attack'
				stat={special_attack}
				colorScheme={'orange'}
			/>
			<PokemonStat
				title='Sp Defense'
				stat={special_defense}
				colorScheme={'blue'}
			/>
			<PokemonStat title='Speed' stat={speed} colorScheme={'orange'} />
			<Text color={'white'} fontSize={'1xl'} fontWeight={'bold'}>
				Total: {totalStat}
			</Text>
		</Box>
	)
}

export default PokemonStats
