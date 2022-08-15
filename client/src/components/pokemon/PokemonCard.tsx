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
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const currentPokemonId = useAppSelector(
		state => state.pokemonDetailReducer.pokemonDetail.pokemonInfo.id
	)
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
				navigate('/pokemon_detail')
				const checkCurrentPokemon = currentPokemonId === id

				if (!checkCurrentPokemon) {
					dispatch(setLoading(true))
					getPokemonDetail(id, name)
				}
			}}>
			<Text fontSize={'1xl'} /* color={'black'} */>
				#{id} {name ? name.charAt(0).toUpperCase() + name.slice(1) : name}
			</Text>
			<Center>
				<Image src={image} boxSize={'150px'} />
			</Center>
		</Box>
	)
}

export default PokemonCard
