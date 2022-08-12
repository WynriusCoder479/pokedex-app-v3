import { Box, Center, Text } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/store/hooks'
import PokemonCard from './PokemonCard'
import ButtonBack from './refactor/ButtonBack'

const SinglePokemon = () => {
	const pokemon = useAppSelector(
		state => state.pokemonReducer.storeSearchPokemon
	)

	const { id, name, image } = pokemon

	const isPokemonNotFound = useAppSelector(
		state => state.pokemonReducer.isNotFoundPokemon
	)

	return (
		<>
			{isPokemonNotFound ? (
				<Box>
					<Text>
						Pokemon not found <ButtonBack />
					</Text>
				</Box>
			) : (
				<Box>
					<Center mt={'20px'}>
						<PokemonCard id={id} name={name} image={image} />
					</Center>
					<ButtonBack />
				</Box>
			)}
		</>
	)
}

export default SinglePokemon
