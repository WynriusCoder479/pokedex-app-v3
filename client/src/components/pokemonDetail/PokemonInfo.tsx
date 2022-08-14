import { Box } from '@chakra-ui/react'
import PokemonName from './PokemonInfo/PokemonName'

import PokemonSprite from './PokemonInfo/PokemonSprite'
import PokemonTypes from './PokemonInfo/PokemonTypes'

const PokemonInfo = () => {
	return (
		<Box
			w={{ lg: '600px', base: '400px' }}
			background={'teal.400'}
			rounded={'15px'}
			justifyItems='center'
			alignContent='center'>
			<PokemonName />
			<PokemonSprite />
			<PokemonTypes />
		</Box>
	)
}

export default PokemonInfo
