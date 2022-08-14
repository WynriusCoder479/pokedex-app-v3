import { useAppSelector } from '../../../redux/store/hooks'
import PokemonInfoWrapper from '../refactor/PokemonInfoWrapper'
import SpriteCard from '../refactor/SpriteCard'

const PokemonSprite = () => {
	const pokemonDetail = useAppSelector(state => state.pokemonDetailReducer)
	const { pokemonSprite } = pokemonDetail.pokemonDetail
	return (
		<PokemonInfoWrapper>
			<SpriteCard title='Default' sprite={pokemonSprite.front} />
			<SpriteCard title='Shiny' sprite={pokemonSprite.shiny} />
		</PokemonInfoWrapper>
	)
}

export default PokemonSprite
