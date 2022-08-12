import { Button } from '@chakra-ui/react'

interface props {
	title: string
}

const ButtonSubmit = ({ title }: props) => {
	return (
		<Button type='submit' colorScheme='blue' my={'25px'}>
			{title}
		</Button>
	)
}

export default ButtonSubmit
