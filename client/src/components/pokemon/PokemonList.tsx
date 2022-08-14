import { Center, Grid, GridItem } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/store/hooks'
import PokemonCard from './PokemonCard'

const PokemonList = () => {
	const pokemonList = useAppSelector(
		state => state.pokemonReducer.pokemonList.pokemons
	)

	return (
		<Center>
			<Grid
				templateColumns={{
					lg: 'repeat(7, 1fr)',
					md: 'repeat(3, 1fr)',
					base: 'repeat(2, 1fr)'
				}}>
				{pokemonList.map((poke, index) => {
					const { id, name, image } = poke
					return (
						<GridItem
							key={index}
							my={'10px'}
							mx={{
								lg: '10px',
								md: '10px',
								base: '5px'
							}}>
							<PokemonCard id={id} name={name} image={image} />
						</GridItem>
					)
				})}
			</Grid>
		</Center>
	)
}

export default PokemonList
