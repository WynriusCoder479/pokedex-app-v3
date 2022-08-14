import { Box, Center, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { usePokemonDetailContext } from '../../contexts/PokemonDetailContext'
import { setLoading } from '../../redux/slice/pokemonDetail/pokemonDetailSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks'

interface pokemonProps {
	id: number
	name: string
	image: string
}

const PokemonCard = ({ id, name, image }: pokemonProps) => {
	const { getPokemonDetail } = usePokemonDetailContext()
	const isLoading = useAppSelector(
		state => state.pokemonDetailReducer.isLoading
	)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	return (
		<Box
			cursor={'pointer'}
			width={{
				lg: '200px',
				md: '200px',
				base: '180px'
			}}
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
				!isLoading && dispatch(setLoading(true))
				navigate('/pokemon_detail')
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
