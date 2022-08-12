import { Button } from '@chakra-ui/react'
import { useAuthContext } from '../../../contexts/AuthContext'

const ButtonLogout = () => {
	const { userLogout } = useAuthContext()

	return (
		<Button colorScheme='teal' mx={'5px'} onClick={() => userLogout()}>
			Logout
		</Button>
	)
}

export default ButtonLogout
