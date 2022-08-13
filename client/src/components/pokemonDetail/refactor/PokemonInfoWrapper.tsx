import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

const PokemonInfoWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<Flex
			background={'white'}
			rounded={'15px'}
			justifyContent={'center'}
			alignItems={'center'}
			padding={'10px'}
			mx={'10px'}
			my={'10px'}>
			{children}
		</Flex>
	)
}

export default PokemonInfoWrapper
