import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface props {
	title: string
	children: ReactNode
}

const AccordionWrapper = ({ children, title }: props) => {
	return (
		<AccordionItem my={'5px'}>
			<AccordionButton
				rounded={'5px'}
				_expanded={{ bg: 'teal.500', color: 'white' }}
				_hover={{ bg: 'teal.400', color: 'white' }}
				bg={'teal.400'}
				color={'white'}>
				<Box flex='1' textAlign='left'>
					{title}
				</Box>
				<AccordionIcon />
			</AccordionButton>
			<AccordionPanel pb={2}>{children}</AccordionPanel>
		</AccordionItem>
	)
}

export default AccordionWrapper
