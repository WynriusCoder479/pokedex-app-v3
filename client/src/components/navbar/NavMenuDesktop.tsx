import { Flex } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/store/hooks'
import ButtonColorMode from '../colorMode/ButtonColorMode'
import NavMenuLinkDesktop from './NavMenuLinkDesktop'
import ButtonAuth from './refactor/ButtonAuth'
import ButtonLogout from './refactor/ButtonLogout'

const NavMenuDesktop = () => {
	const auth = useAppSelector(state => state.authReducer.auth.isAuthenticated)

	return (
		<Flex my='auto' mr='10px'>
			{auth ? (
				<Flex>
					<NavMenuLinkDesktop />
					<ButtonColorMode />
					<ButtonLogout />
				</Flex>
			) : (
				<Flex>
					<NavMenuLinkDesktop />
					<ButtonColorMode />
					<ButtonAuth />
				</Flex>
			)}
		</Flex>
	)
}

export default NavMenuDesktop
