import { Box, Flex, Text } from '@chakra-ui/react'

interface props {
	name: string
	isHidden?: boolean
	effect: string
}

const PokemonAbility = ({ name, isHidden, effect }: props) => {
	return (
		<Box
			bg={isHidden ? 'orange.400' : 'teal.400'}
			color={'white'}
			rounded={'5px'}
			p={'8px'}
			mb={'10px'}
			boxShadow={'lg'}>
			<Flex>
				<Text fontSize={'1xl'} fontWeight={'bold'} mr={'3px'}>
					Name:{' '}
				</Text>

				<Text fontSize={'1xl'}>
					{name.charAt(0).toUpperCase() + name.slice(1)}
				</Text>
			</Flex>
			<Text fontSize={'1xl'} fontWeight={'bold'}>
				{isHidden ? 'Hidden Ability' : 'Standard Ability'}
			</Text>
			<Flex>
				<Text fontSize={'1xl'} fontWeight={'bold'} mr={'3px'}>
					Effect:{' '}
				</Text>
				<Text fontSize={'1xl'}>{effect}</Text>
			</Flex>
		</Box>
	)
}

export default PokemonAbility
