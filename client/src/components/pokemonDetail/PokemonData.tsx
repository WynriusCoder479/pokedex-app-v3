import { Accordion } from '@chakra-ui/react'
import PokemonAbilities from './PokemonData/PokemonAbilities'
import PokemonMoves from './PokemonData/PokemonMoves'
import PokemonStats from './PokemonData/PokemonStats'
import AccordionWrapper from './refactor/AccordionWrapper'

const PokemonData = () => {
	return (
		<Accordion allowToggle mt={'10px'} mx={'5px'} borderColor={'transparent'}>
			<AccordionWrapper title='STAT'>
				<PokemonStats />
			</AccordionWrapper>
			<AccordionWrapper title='ABILITIES'>
				<PokemonAbilities />
			</AccordionWrapper>
			<AccordionWrapper title='MOVES'>
				<PokemonMoves />
			</AccordionWrapper>
		</Accordion>
	)
}

export default PokemonData
