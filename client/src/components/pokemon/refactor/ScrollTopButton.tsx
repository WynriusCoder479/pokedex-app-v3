import { SearchIcon } from '@chakra-ui/icons'
import { Box, IconButton, Link } from '@chakra-ui/react'

const ScrollTopButton = () => {
	return (
		<Link>
			<Box
				position='fixed'
				bottom={{ lg: '10px', md: '50px', sm: '60px', base: '60px' }}
				right={'10px'}
				zIndex={2}
				p={'10px'}>
				<IconButton
					rounded={50}
					aria-label='search'
					icon={<SearchIcon w={'20px'} h={'20px'} />}
					colorScheme='teal'
					onClick={() =>
						window.scrollTo({
							top: 0,
							behavior: 'smooth'
						})
					}
				/>
			</Box>
		</Link>
	)
}

export default ScrollTopButton
