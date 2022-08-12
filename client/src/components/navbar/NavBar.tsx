import { Box, Flex, Spacer, useBreakpointValue } from '@chakra-ui/react'
import ButtonColorMode from '../colorMode/ButtonColorMode'
import Logo from './Logo'
import NavMenuDesktop from './NavMenuDesktop'
import NavMenuMobile from './NavMenuMobile'

const NavBar = () => {
	const isDesktop = useBreakpointValue({
		base: false,
		lg: true
	})
	return (
		<Box
			as='section'
			w={'100%'}
			position={'fixed'}
			boxShadow='2xl'
			zIndex={'1000'}>
			<Box as='nav' bg='teal.300'>
				<Flex py={{ base: '3px', lg: '5px' }} my='auto'>
					<Logo />
					<Spacer />
					{isDesktop ? (
						<NavMenuDesktop />
					) : (
						<>
							<ButtonColorMode />
							<NavMenuMobile />
						</>
					)}
				</Flex>
			</Box>
		</Box>
	)
}

export default NavBar
