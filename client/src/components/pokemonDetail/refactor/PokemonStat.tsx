import { Box, Flex, Progress, Text } from '@chakra-ui/react'

interface props {
	title: string
	stat: number
	colorScheme: string
}

const PokemonStat = ({ stat, title, colorScheme }: props) => {
	const statCalculator = (stat: number) => (stat * 100) / 255
	return (
		<Box mb={'10px'}>
			<Flex>
				<Text color={'white'} fontSize={'1xl'} fontWeight={'bold'}>
					{title}
				</Text>
				<Text color={'white'} fontSize={'1xl'}>
					: {stat}
				</Text>
			</Flex>
			<Progress
				colorScheme={colorScheme}
				value={statCalculator(stat)}
				rounded={'5px'}
			/>
		</Box>
	)
}

export default PokemonStat
