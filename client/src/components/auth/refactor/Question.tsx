import { Button, Flex, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface props {
	to: string
	title: string
	link: string
}

const Questtion = ({ title, link, to }: props) => {
	const navigate = useNavigate()

	return (
		<Flex>
			<Text color={'whiteAlpha.900'} fontSize='2xl'>
				{title}
			</Text>
			<Button
				ml={'10px'}
				fontSize={'2xl'}
				variant={'link'}
				color='blue.400'
				onClick={() => navigate(link)}>
				{to}
			</Button>
		</Flex>
	)
}

export default Questtion
