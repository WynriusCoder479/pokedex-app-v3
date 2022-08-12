import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton, useColorMode } from '@chakra-ui/react'

const ButtonColorMode = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<IconButton
			my={'auto'}
			background={'transparent'}
			aria-label='Search database'
			icon={
				colorMode === 'light' ? (
					<MoonIcon width='30px' height='25px' color='whiteAlpha.800' />
				) : (
					<SunIcon width='30px' height='25px' color='whiteAlpha.800' />
				)
			}
			_hover={{
				background: 'transparent'
			}}
			_active={{
				background: 'transparent'
			}}
			onClick={toggleColorMode}
		/>
	)
}

export default ButtonColorMode
