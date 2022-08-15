import { Accordion } from '@chakra-ui/react'
import PokemonAbilities from './PokemonData/PokemonAbilities'
import PokemonMoveMachines from './PokemonData/PokemonMoveMachines'
import PokemonMoves from './PokemonData/PokemonMoves'
import PokemonStats from './PokemonData/PokemonStats'
import AccordionWrapper from './refactor/AccordionWrapper'

const PokemonData = () => {
	return (
		<Accordion
			allowToggle
			mt={'10px'}
			mx={{ base: '5px', sm: '30px' }}
			borderColor={'transparent'}>
			<AccordionWrapper title='STAT'>
				<PokemonStats />
			</AccordionWrapper>
			<AccordionWrapper title='ABILITIES'>
				<PokemonAbilities />
			</AccordionWrapper>
			<AccordionWrapper title='MOVES'>
				<PokemonMoves />
			</AccordionWrapper>
			<AccordionWrapper title='TM (Techinical Machine)'>
				<PokemonMoveMachines />
			</AccordionWrapper>
		</Accordion>
	)
}

export default PokemonData
