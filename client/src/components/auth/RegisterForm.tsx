import { Box } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useAuthContext } from '../../contexts/AuthContext'
import ButtonSubmit from './refactor/ButtonSubmit'
import InputField from './refactor/InputField'
import Questtion from './refactor/Question'

const RegisterForm = () => {
	const passwordPartern: RegExp =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

	const initialValues = {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	}

	const validationSchema = Yup.object({
		username: Yup.string()
			.required('Username is required')
			.matches(/^((?!@).)*$/, 'Username not contain @'),
		email: Yup.string().required('Email is required').email('Invalid email'),
		password: Yup.string()
			.required('Password is required')
			.matches(
				passwordPartern,
				'Password must be greater than 8, at least one uppercase letter, at least one digit, and at least one special character'
			),
		confirmPassword: Yup.string()
			.required('Please re enter password')
			.oneOf([Yup.ref('password')], 'Confirm password not match')
	})

	const { userRegister } = useAuthContext()

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={values => userRegister(values)}>
				{({ errors }) => (
					<Form>
						<Box my={'10px'}>
							<InputField
								name='username'
								type='text'
								label='Username'
								placeholder='Username'
								error={errors.username}
							/>
						</Box>
						<Box my={'10px'}>
							<InputField
								name='email'
								type='email'
								label='Email'
								placeholder='Email'
								error={errors.email}
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
						<Box my={'10px'}>
							<InputField
								isPassword
								name='confirmPassword'
								type='password'
								label='Confirm Password'
								placeholder='Confirm Password'
								error={errors.confirmPassword}
							/>
						</Box>
						<ButtonSubmit title='Register' />
					</Form>
				)}
			</Formik>
			<Questtion
				title='Already have an account ?'
				to='Register'
				link='/login'
			/>
		</>
	)
}

export default RegisterForm
