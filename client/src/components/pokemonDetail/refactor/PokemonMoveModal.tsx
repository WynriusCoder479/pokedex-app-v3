import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text
} from '@chakra-ui/react'
import { nameFormat } from '../../../utils/nameFormat'
import PokemonType from './PokemonType'

interface props {
	isOpen: boolean
	onClose: () => void
	name: string
	type: string
	damageClass: string
	pp: number
	power: number | null
	accuracy: number | null
	effect: string
}

const PokemonMoveModal = ({ ...props }: props) => {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
			<ModalOverlay />
			<ModalContent mx={'5px'}>
				<ModalHeader>{nameFormat(props.name)}</ModalHeader>
				<ModalCloseButton />
				<ModalBody bg={'teal.400'}>
					<Flex
						p={'5px'}
						m={'5px'}
						bg={'white'}
						rounded={'5px'}
						justify={'space-between'}>
						<Text
							fontSize={'1xl'}
							fontWeight={'bold'}
							color={'black'}
							my={'auto'}>
							Class: {props.damageClass}
						</Text>
						<PokemonType type={props.type} />
					</Flex>
					<Flex
						justify={'space-between'}
						p={'5px'}
						m={'5px'}
						bg={'white'}
						rounded={'5px'}>
						<Flex>
							<Text
								fontSize={'1xl'}
								fontWeight={'bold'}
								mr={'5px'}
								color={'black'}>
								PP:
							</Text>
							<Text fontSize={'1xl'} color={'black'}>
								{props.pp}
							</Text>
						</Flex>
						<Flex>
							<Text
								fontSize={'1xl'}
								fontWeight={'bold'}
								mr={'5px'}
								color={'black'}>
								Power:
							</Text>
							<Text fontSize={'1xl'} color={'black'}>
								{props.power ? props.power : '___'}
							</Text>
						</Flex>
						<Flex>
							<Text
								fontSize={'1xl'}
								fontWeight={'bold'}
								mr={'5px'}
								color={'black'}>
								Accuracy:
							</Text>
							<Text fontSize={'1xl'} color={'black'}>
								{props.accuracy ? props.accuracy : '___'}
							</Text>
						</Flex>
					</Flex>
					<Flex p={'5px'} m={'5px'} bg={'white'} rounded={'5px'}>
						<Text
							fontSize={'1xl'}
							color={'black'}
							fontWeight={'bold'}
							mr={'5px'}>
							Effect:
						</Text>
						<Text fontSize={'1xl'} color={'black'}>
							{props.effect.replace('$effect_chance%', ' ')}
						</Text>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='teal' mr={3} onClick={props.onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default PokemonMoveModal
