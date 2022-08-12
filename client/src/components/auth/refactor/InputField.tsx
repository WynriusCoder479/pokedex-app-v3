import { SearchIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
	FormControl,
	FormLabel,
	Textarea,
	Input,
	InputGroup,
	InputRightElement,
	Tooltip,
	IconButton,
	FormErrorMessage,
	Box
} from '@chakra-ui/react'
import { useField } from 'formik'
import { useState } from 'react'

interface InputFieldProps {
	name: string
	label?: string
	placeholder: string
	type: string
	border?: string
	borderColor?: string
	textarea?: boolean
	isPassword?: boolean
	isSearch?: boolean
	error?: string
}

const InputField = ({
	isPassword,
	isSearch,
	textarea,
	...props
}: InputFieldProps) => {
	const [field, { error }] = useField(props)
	const [showPassword, setShowPassword] = useState(false)

	return (
		<Box>
			<FormControl isInvalid={!!error}>
				<FormLabel htmlFor={field.name} color='white'>
					{props.label}
				</FormLabel>
				{textarea ? (
					<Textarea id={field.name} {...field} {...props} bg='whiteAlpha.800' />
				) : isPassword ? (
					<InputGroup>
						<Input
							id={field.name}
							{...field}
							{...props}
							type={showPassword ? 'text' : 'password'}
							bg='whiteAlpha.800'
						/>
						<InputRightElement width={'4.5rem'}>
							<Tooltip
								hasArrow
								label={showPassword ? 'Hide password' : 'Show password'}
								bg='teal.600'>
								<IconButton
									aria-label='show password'
									cursor={'pointer'}
									bg={'transparent'}
									icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
									onClick={() => setShowPassword(!showPassword)}
									_hover={{
										background: 'transparent'
									}}
								/>
							</Tooltip>
						</InputRightElement>
					</InputGroup>
				) : isSearch ? (
					<InputGroup boxShadow={'lg'}>
						<Input
							id={field.name}
							{...field}
							{...props}
							bg='white'
							color={'black'}
						/>
						<InputRightElement width={'4.5rem'}>
							<Tooltip hasArrow label={'Search'} bg='teal.600'>
								<IconButton
									color={'black'}
									cursor={'pointer'}
									aria-label='show password'
									bg={'transparent'}
									icon={<SearchIcon />}
									type={'submit'}
									_hover={{
										background: 'transparent'
									}}
								/>
							</Tooltip>
						</InputRightElement>
					</InputGroup>
				) : (
					<Input id={field.name} {...field} {...props} bg='whiteAlpha.800' />
				)}
				<FormErrorMessage>{props.error}</FormErrorMessage>
			</FormControl>
		</Box>
	)
}

export default InputField
