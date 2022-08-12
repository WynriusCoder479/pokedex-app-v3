import { Box, Center, Image, Text } from '@chakra-ui/react'
import { usePokemonDetailContext } from '../../contexts/PokemonDetailContext'

interface pokemonProps {
	id: number
	name: string
	image: string
}

const PokemonCard = ({ id, name, image }: pokemonProps) => {
	const { getPokemonDetail } = usePokemonDetailContext()

	return (
		<Box
			cursor={'pointer'}
			width={'200px'}
			/* bg='white' */
			border={'solid 4px'}
			borderColor={'teal'}
			rounded={'10px'}
			boxShadow={'lg'}
			_hover={{
				opacity: '.8'
			}}
			_active={{
				opacity: '.5'
			}}
			onClick={() => {
				getPokemonDetail(id, name)
			}}>
			<Text fontSize={'2xl'} /* color={'black'} */>
				#{id} {name ? name.charAt(0).toUpperCase() + name.slice(1) : name}
			</Text>
			<Center>
				<Image src={image} boxSize={'150px'} />
			</Center>
		</Box>
	)
}

export default PokemonCard
