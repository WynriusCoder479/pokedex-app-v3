import { Flex, Spinner } from '@chakra-ui/react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../redux/store/hooks'

const ProtectedRoute = () => {
	const auth = useAppSelector(state => state.authReducer.auth)

	if (auth.isLoading)
		return (
			<Flex justify={'space-between'} align={'center'} m={'auto'}>
				<Spinner size={'lg'} />
			</Flex>
		)

	return auth.isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoute
