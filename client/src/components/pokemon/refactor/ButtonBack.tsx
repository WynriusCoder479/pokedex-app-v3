import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import {
	setNotFoundPokemon,
	setShowSearchPokemon
} from '../../../redux/slice/pokemon/pokemonSlice'
import { useAppDispatch } from '../../../redux/store/hooks'

const ButtonBack = () => {
	const dispatch = useAppDispatch()
	return (
		<Button
			colorScheme='teal'
			variant={'link'}
			mt={10}
			onClick={() => {
				dispatch(setNotFoundPokemon(false))
				dispatch(setShowSearchPokemon(false))
			}}>
			<ArrowBackIcon /> Back
		</Button>
	)
}

export default ButtonBack
