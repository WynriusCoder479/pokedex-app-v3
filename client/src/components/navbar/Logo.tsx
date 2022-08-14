import { Flex, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { setShowSearchPokemon } from '../../redux/slice/pokemon/pokemonSlice'
import { useAppDispatch } from '../../redux/store/hooks'
const logo = require('../../assets/logo.png')

const Logo = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	return (
		<Flex
			cursor={'pointer'}
			ml='10px'
			onClick={() => {
				dispatch(setShowSearchPokemon(false))
				navigate('/')
			}}>
			<Image src={logo} width={'60px'} height={'60px'} />
			<Text
				fontSize={'4xl'}
				color='whiteAlpha.800'
				fontWeight={'bold'}
				mx={'10px'}>
				Pokedex
			</Text>
		</Flex>
	)
}

export default Logo
