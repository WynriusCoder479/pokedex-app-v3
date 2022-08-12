import { Box } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAuthContext } from '../../contexts/AuthContext'
import { LoginInput } from '../../graphql/auth/types/UserInput'
import ButtonSubmit from './refactor/ButtonSubmit'
import InputField from './refactor/InputField'
import Questtion from './refactor/Question'

const LoginForm = () => {
	const initialValues = {
		usernameOrEmail: '',
		password: ''
	} as LoginInput

	const validationSchema = Yup.object({
		usernameOrEmail: Yup.string().required('Username or email is required'),
		password: Yup.string().required('Password is required')
	})

	const { userLogin } = useAuthContext()

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={values => userLogin(values)}>
				{({ errors }) => (
					<Form>
						<Box my={'10px'}>
							<InputField
								name='usernameOrEmail'
								type='text'
								label='Username or Email'
								placeholder='Username or Email'
								error={errors.usernameOrEmail}
							/>
						</Box>
						<Box my={'10px'}>
							<InputField
								isPassword
								name='password'
								type='password'
								label='Password'
								placeholder='Password'
								error={errors.password}
							/>
						</Box>
						<ButtonSubmit title='Login' />
					</Form>
				)}
			</Formik>

			<Questtion
				title="Don't have an account ?"
				to='Register'
				link='/register'
			/>
		</>
	)
}

export default LoginForm
