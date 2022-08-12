import { Center, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/store/hooks'
import PokemonCard from './PokemonCard'

const PokemonList = () => {
	const pokemonList = useAppSelector(
		state => state.pokemonReducer.pokemonList.pokemons
	)

	const isDesktop = useBreakpointValue({
		base: false,
		lg: true
	})

	const isTablet = useBreakpointValue({
		base: false,
		md: true
	})

	return (
		<Center>
			<Grid
				templateColumns={
					isDesktop
						? 'repeat(7, 1fr)'
						: isTablet
						? 'repeat(3, 1fr)'
						: 'repeat(2, 1fr)'
				}>
				{pokemonList.map((poke, index) => {
					const { id, name, image } = poke
					return (
						<GridItem key={index} my={'10px'} mx={'10px'}>
							<PokemonCard id={id} name={name} image={image} />
						</GridItem>
					)
				})}
			</Grid>
		</Center>
	)
}

export default PokemonList
