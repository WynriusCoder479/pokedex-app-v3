import { Box, Button } from '@chakra-ui/react'
import { useCallback } from 'react'
import PokemonList from '../components/pokemon/PokemonList'
import PokemonSearchField from '../components/pokemon/PokemonSearchField'
import ScrollTopButton from '../components/pokemon/refactor/ScrollTopButton'
import SinglePokemon from '../components/pokemon/SinglePokemon'

import { usePokemonContext } from '../contexts/PokemonContext'
import { useAppSelector } from '../redux/store/hooks'

const Home = () => {
	const { getPokemons, isLoading } = usePokemonContext()

	const offset = useAppSelector(
		state => state.pokemonReducer.pokemonList.nextOffset
	)

	useCallback(() => {
		getPokemons('get', 0)
	}, [getPokemons])

	const isShowSearchPokemon = useAppSelector(
		state => state.pokemonReducer.isShowSearchPokemon
	)

	return (
		<Box textAlign={'center'}>
			<PokemonSearchField />

			{isShowSearchPokemon ? (
				<SinglePokemon />
			) : (
				<>
					<PokemonList />
					<Button
						colorScheme='teal'
						isLoading={isLoading}
						my={'15px'}
						onClick={() => {
							getPokemons('load', offset)
						}}>
						Load more
					</Button>
				</>
			)}

			<ScrollTopButton />
		</Box>
	)
}

export default Home
