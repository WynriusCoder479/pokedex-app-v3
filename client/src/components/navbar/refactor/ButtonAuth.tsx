import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const ButtonAuth = () => {
	const naviagte = useNavigate()

	return (
		<>
			<Button
				colorScheme={'teal'}
				mx={'10px'}
				onClick={() => naviagte('/register')}>
				Register
			</Button>
			<Button
				colorScheme={'teal'}
				mx={'10px'}
				onClick={() => naviagte('/login')}>
				Login
			</Button>
		</>
	)
}

export default ButtonAuth
