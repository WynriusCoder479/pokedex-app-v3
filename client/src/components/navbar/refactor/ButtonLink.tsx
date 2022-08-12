import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface props {
	title: string
	to: string
}

const ButtonLink = ({ title, to }: props) => {
	const navigate = useNavigate()

	return (
		<Button
			color={'teal'}
			variant={'link'}
			mx={'5px'}
			fontSize={'2xl'}
			onClick={() => navigate(to)}>
			{title}
		</Button>
	)
}

export default ButtonLink
