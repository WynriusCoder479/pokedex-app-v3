import { Box, Flex, Text } from '@chakra-ui/react'
import PokemonType from './PokemonType'

interface props {
	name: string
	level: number
	type: string
	pp: number
	power: number | null
	accuracy: number | null
	damageClass: string
	effect: string
}

const PokemonMove = ({ ...props }: props) => {
	const moveNameFormat = (move: string) => {
		const moveArr = move.replace('-', ' ').split(' ')

		return moveArr
			.map(element => element.charAt(0).toUpperCase() + element.slice(1))
			.join(' ')
	}
	return (
		<Box p={'8px'} bg={'teal.400'} rounded={'5px'} my={'5px'}>
			<Box p={'5px'} m={'5px'} bg={'white'} rounded={'5px'}>
				<Flex justify={'space-between'}>
					<Text
						my={'auto'}
						fontSize={'2xl'}
						fontWeight={'bold'}
						color={'black'}>
						{moveNameFormat(props.name)}
					</Text>
					<PokemonType type={props.type} />
				</Flex>
				<Text fontSize={'1xl'} fontWeight={'bold'} color={'black'}>
					Level-up: {props.level}
				</Text>
				<Text fontSize={'1xl'} fontWeight={'bold'} color={'black'}>
					Class: {props.damageClass}
				</Text>
			</Box>
			<Flex
				justify={'space-between'}
				p={'5px'}
				m={'5px'}
				bg={'white'}
				rounded={'5px'}>
				<Flex>
					<Text fontSize={'1xl'} fontWeight={'bold'} mr={'5px'} color={'black'}>
						PP:
					</Text>
					<Text fontSize={'1xl'} color={'black'}>
						{props.pp}
					</Text>
				</Flex>
				<Flex>
					<Text fontSize={'1xl'} fontWeight={'bold'} mr={'5px'} color={'black'}>
						Power:
					</Text>
					<Text fontSize={'1xl'} color={'black'}>
						{props.power ? props.power : '___'}
					</Text>
				</Flex>
				<Flex>
					<Text fontSize={'1xl'} fontWeight={'bold'} mr={'5px'} color={'black'}>
						Accuracy:
					</Text>
					<Text fontSize={'1xl'} color={'black'}>
						{props.accuracy ? props.accuracy : '___'}
					</Text>
				</Flex>
			</Flex>
			<Flex p={'5px'} m={'5px'} bg={'white'} rounded={'5px'}>
				<Text fontSize={'1xl'} color={'black'} fontWeight={'bold'} mr={'5px'}>
					Effect:
				</Text>
				<Text fontSize={'1xl'} color={'black'}>
					{props.effect.replace('$effect_chance%', ' ')}
				</Text>
			</Flex>
		</Box>
	)
}

export default PokemonMove
