import { Box, Center, Text, Image } from '@chakra-ui/react'

interface props {
	title: 'Default' | 'Shiny'
	sprite: string
}

const SpriteCard = ({ sprite, title }: props) => {
	return (
		<Box
			cursor={'pointer'}
			width={'200px'}
			rounded={'10px'}
			textAlign={'center'}>
			<Text fontSize={'2xl'}>{title}</Text>
			<Center>
				<Image src={sprite} boxSize={'150px'} />
			</Center>
		</Box>
	)
}

export default SpriteCard
