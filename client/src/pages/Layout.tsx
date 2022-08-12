import { Box, Spacer } from '@chakra-ui/react'

import { Outlet } from 'react-router-dom'
import NavBar from '../components/navbar/NavBar'

const Layout = () => {
	return (
		<Box>
			<NavBar />
			<Spacer h={'80px'} />
			<Outlet />
		</Box>
	)
}

export default Layout
