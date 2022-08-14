import { Flex } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/store/hooks'
import ButtonLink from './refactor/ButtonLink'
import Dash from './refactor/Dash'

const NavMenuLinkDesktop = () => {
	const auth = useAppSelector(state => state.authReducer.auth.isAuthenticated)
	return (
		<>
			<ButtonLink title='PokeDex' to='/' type='home' />
			<Dash />
			<ButtonLink title='Type calculator' to='/calculator' />
			{auth && (
				<Flex>
					<Dash />
					<ButtonLink title='Team' to='/team' />
					<Dash />
					<ButtonLink title='Profile' to='/profile' />
				</Flex>
			)}
		</>
	)
}

export default NavMenuLinkDesktop
