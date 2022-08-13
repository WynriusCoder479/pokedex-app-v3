import { Box, Flex, Text } from '@chakra-ui/react'
import { useAppSelector } from '../../redux/store/hooks'
import PokemonInfoWrapper from './refactor/PokemonInfoWrapper'
import PokemonType from './refactor/PokemonType'
import SpriteCard from './refactor/SpriteCard'

const PokemonInfo = () => {
	const pokemonDetail = useAppSelector(state => state.pokemonDetailReducer)
	const { pokemonInfo, pokemonSprite } = pokemonDetail.pokemonDetail

	return (
		<Box
			w={'600px'}
			background={'teal.400'}
			rounded={'15px'}
			justifyItems='center'
			alignContent='center'>
			<PokemonInfoWrapper>
				<Text fontSize={'3xl'}>
					#{pokemonInfo.id}{' '}
					{pokemonInfo.name.charAt(0).toLocaleUpperCase() +
						pokemonInfo.name.slice(1)}
				</Text>
			</PokemonInfoWrapper>
			<PokemonInfoWrapper>
				<SpriteCard title='Default' sprite={pokemonSprite.front} />
				<SpriteCard title='Shiny' sprite={pokemonSprite.shiny} />
			</PokemonInfoWrapper>
			<PokemonInfoWrapper>
				<Box textAlign={'center'}>
					<Text fontSize={'2xl'} mb={'10px'}>
						Type
					</Text>
					<Flex>
						<PokemonType type={pokemonInfo.primaryType} />
						{pokemonInfo.secondaryType !== '' && (
							<PokemonType type={pokemonInfo.secondaryType} />
						)}
					</Flex>
				</Box>
			</PokemonInfoWrapper>
		</Box>
	)
}

export default PokemonInfo
