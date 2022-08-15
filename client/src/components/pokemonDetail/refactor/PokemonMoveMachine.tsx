import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { nameFormat } from '../../../utils/nameFormat'
import PokemonMoveModal from './PokemonMoveModal'

interface props {
	machineNumber: number
	name: string
	type: string
	damageClass: string
	pp: number
	power: number | null
	accuracy: number | null
	effect: string
}

const PokemonMoveMachine = ({ ...props }: props) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Flex
				bg={'teal.400'}
				color={'white'}
				rounded={'5px'}
				p={'8px'}
				mb={'10px'}
				boxShadow={'lg'}
				justify={'space-between'}
				cursor={'pointer'}
				_hover={{
					background: 'teal.600'
				}}
				_active={{
					background: 'teal.800'
				}}
				onClick={onOpen}>
				<Box
					bg={'white'}
					rounded={'50px'}
					p={'5px'}
					w={'70px'}
					textAlign={'center'}>
					<Text color={'black'}>TM{props.machineNumber}</Text>
				</Box>
				<Text fontSize={'1xl'} fontWeight={'bold'} my={'auto'} mx={'auto'}>
					{nameFormat(props.name)}
				</Text>
			</Flex>
			<PokemonMoveModal isOpen={isOpen} onClose={onClose} {...props} />
		</>
	)
}

export default PokemonMoveMachine
