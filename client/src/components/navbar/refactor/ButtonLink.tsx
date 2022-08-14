import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { setShowSearchPokemon } from '../../../redux/slice/pokemon/pokemonSlice'
import { useAppDispatch } from '../../../redux/store/hooks'

interface props {
	title: string
	to: string
	type?: 'home'
}

const ButtonLink = ({ title, to, type }: props) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	return (
		<Button
			color={'teal'}
			variant={'link'}
			mx={'5px'}
			fontSize={'2xl'}
			onClick={() => {
				type === 'home' && dispatch(setShowSearchPokemon(false))

				navigate(to)
			}}>
			{title}
		</Button>
	)
}

export default ButtonLink
