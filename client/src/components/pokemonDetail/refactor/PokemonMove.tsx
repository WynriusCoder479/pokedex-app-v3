import { Box, Flex, Text } from '@chakra-ui/react'
import { nameFormat } from '../../../utils/nameFormat'
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
	return (
		<Box p={'8px'} bg={'teal.400'} rounded={'5px'} my={'5px'}>
			<Flex
				p={'5px'}
				m={'5px'}
				bg={'white'}
				rounded={'5px'}
				justify={'space-between'}>
				<Box>
					<Text
						my={'auto'}
						fontSize={'2xl'}
						fontWeight={'bold'}
						color={'black'}>
						{nameFormat(props.name)}
					</Text>
					<Text fontSize={'1xl'} fontWeight={'bold'} color={'black'}>
						Level-up: {props.level}
					</Text>
					<Text fontSize={'1xl'} fontWeight={'bold'} color={'black'}>
						Class: {props.damageClass}
					</Text>
				</Box>
				<Box my={'auto'}>
					<PokemonType type={props.type} />
				</Box>
			</Flex>
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
