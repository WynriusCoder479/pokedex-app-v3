import { Flex, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
const logo = require('../../assets/logo.png')

const Logo = () => {
	const navigate = useNavigate()
	return (
		<Flex cursor={'pointer'} ml='10px' onClick={() => navigate('/')}>
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
