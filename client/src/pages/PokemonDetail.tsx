import {
	Box,
	Center,
	Flex,
	Grid,
	GridItem,
	Spinner,
	useBreakpointValue
} from '@chakra-ui/react'
import PokemonData from '../components/pokemonDetail/PokemonData'
import PokemonInfo from '../components/pokemonDetail/PokemonInfo'
import { useAppSelector } from '../redux/store/hooks'
const PokemonDetail = () => {
	const isLoading = useAppSelector(
		state => state.pokemonDetailReducer.isLoading
	)

	const isDesktop = useBreakpointValue({
		base: false,
		lg: true
	})

	return (
		<>
			{isLoading ? (
				<Flex justifyContent='center' alignItems='center' minH='100vh'>
					<Spinner size={'lg'} colorScheme={'teal'} />
				</Flex>
			) : (
				<Center>
					{isDesktop ? (
						<Grid templateColumns='repeat(2, 1fr)'>
							<GridItem mx={'10px'}>
								<Flex>
									<PokemonInfo />
								</Flex>
							</GridItem>
						</Grid>
					) : (
						<Box w={'100%'}>
							<Center>
								<PokemonInfo />
							</Center>
							<PokemonData />
						</Box>
					)}
				</Center>
			)}
		</>
	)
}

export default PokemonDetail
