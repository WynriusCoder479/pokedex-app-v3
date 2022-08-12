import { Text } from '@chakra-ui/react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import useViewport from '../utils/customeHooks/useViewport'

interface props {
	authRoute: string
}

const Auth = ({ authRoute }: props) => {
	const viewPort = useViewport()
	const isMobile = viewPort.width <= 1024

	return (
		<div className='landing'>
			<div className='dark-overlay'>
				<div className={isMobile ? 'landing-inner-mobile' : 'landing-inner'}>
					<Text fontSize={'5xl'} fontWeight={'bold'} color='white'>
						Pokemon App
					</Text>
					<Text fontSize={'3xl'} fontWeight={'bold'} color='white'>
						Gotta catch em'all
					</Text>
					<>
						{authRoute === 'login' && <LoginForm />}
						{authRoute === 'register' && <RegisterForm />}
					</>
				</div>
			</div>
		</div>
	)
}

export default Auth
