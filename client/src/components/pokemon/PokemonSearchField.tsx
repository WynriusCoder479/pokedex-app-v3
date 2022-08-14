import { Box } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { usePokemonContext } from '../../contexts/PokemonContext'
import { setStorePokemonSearch } from '../../redux/slice/pokemon/pokemonSlice'
import { useAppDispatch } from '../../redux/store/hooks'
import InputField from '../auth/refactor/InputField'

interface pokemonState {
	name: string
}

const PokemonSearchField = () => {
	const initialValues = {
		name: ''
	} as pokemonState

	const { searchPokemonFromApi, searchPokemonFromStore } = usePokemonContext()

	const dispatch = useAppDispatch()

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, { resetForm }) => {
				const pokemonName =
					values.name.charAt(0).toLowerCase() + values.name.slice(1)

				const pokemon = searchPokemonFromStore(pokemonName)

				if (pokemon) {
					dispatch(setStorePokemonSearch(pokemon))
					return resetForm()
				}

				searchPokemonFromApi(pokemonName)
				return resetForm()
			}}>
			{() => (
				<Form>
					<Box
						mx={{ lg: '400px', md: '150px', sm: '30px', base: '20px' }}
						mb={'10px'}>
						<InputField
							isSearch
							name='name'
							placeholder='Pokemon Name'
							border='2px solid'
							borderColor='teal'
							type='text'
						/>
					</Box>
				</Form>
			)}
		</Formik>
	)
}

export default PokemonSearchField
