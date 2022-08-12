import { HamburgerIcon } from '@chakra-ui/icons'
import {
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	IconButton,
	useDisclosure
} from '@chakra-ui/react'
import { useAppSelector } from '../../redux/store/hooks'
import NavMenuLinkMobile from './NavMenuLinkMobile'
import ButtonAuth from './refactor/ButtonAuth'
import ButtonLogout from './refactor/ButtonLogout'

const NavMenuMobile = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const auth = useAppSelector(state => state.authReducer.auth.isAuthenticated)

	return (
		<>
			<IconButton
				variant='ghost'
				icon={
					<HamburgerIcon width='30px' height='30px' color='whiteAlpha.800' />
				}
				my='auto'
				mx='10px'
				aria-label='Open Menu'
				_hover={{
					background: 'transparent'
				}}
				_active={{
					background: 'teal.400'
				}}
				onClick={onOpen}
			/>
			<Drawer placement='right' onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth='1px'>Pokemon App</DrawerHeader>
					<DrawerBody>
						<NavMenuLinkMobile />

						{auth ? (
							<Flex mt={'35px'} justifyContent={'center'}>
								<ButtonLogout />
							</Flex>
						) : (
							<Flex mt={'35px'} justifyContent={'center'}>
								<ButtonAuth />
							</Flex>
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default NavMenuMobile
