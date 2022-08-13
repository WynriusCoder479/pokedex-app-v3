import { Box, Image, Tooltip } from '@chakra-ui/react'

const bug = require('../../../assets/type/Pokemon_Type_Icon_Bug.png')
const darK = require('../../../assets/type/Pokemon_Type_Icon_Dark.png')
const dragon = require('../../../assets/type/Pokemon_Type_Icon_Dragon.png')
const electirc = require('../../../assets/type/Pokemon_Type_Icon_Electric.png')
const fairy = require('../../../assets/type/Pokemon_Type_Icon_Fairy.png')
const fighting = require('../../../assets/type/Pokemon_Type_Icon_Fighting.png')
const fire = require('../../../assets/type/Pokemon_Type_Icon_Fire.png')
const flying = require('../../../assets/type/Pokemon_Type_Icon_Flying.png')
const ghost = require('../../../assets/type/Pokemon_Type_Icon_Ghost.png')
const grass = require('../../../assets/type/Pokemon_Type_Icon_Grass.png')
const ground = require('../../../assets/type/Pokemon_Type_Icon_Ground.png')
const ice = require('../../../assets/type/Pokemon_Type_Icon_Ice.png')
const normal = require('../../../assets/type/Pokemon_Type_Icon_Normal.png')
const poison = require('../../../assets/type/Pokemon_Type_Icon_Poison.png')
const psychic = require('../../../assets/type/Pokemon_Type_Icon_Psychic.png')
const rock = require('../../../assets/type/Pokemon_Type_Icon_Rock.png')
const steel = require('../../../assets/type/Pokemon_Type_Icon_Steel.png')
const water = require('../../../assets/type/Pokemon_Type_Icon_Water.png')

interface props {
	type: string
}

const PokemonType = ({ type }: props) => {
	const chooseType = (Type: string) => {
		switch (Type) {
			case 'bug':
				return bug
			case 'dark':
				return darK
			case 'dragon':
				return dragon
			case 'electric':
				return electirc
			case 'fairy':
				return fairy
			case 'fighting':
				return fighting
			case 'fire':
				return fire
			case 'flying':
				return flying
			case 'ghost':
				return ghost
			case 'grass':
				return grass
			case 'ground':
				return ground
			case 'ice':
				return ice
			case 'normal':
				return normal
			case 'poison':
				return poison
			case 'psychic':
				return psychic
			case 'rock':
				return rock
			case 'steel':
				return steel
			case 'water':
				return water
			default:
				return null
		}
	}

	return (
		<Box width={'35px'} height={'35px'} mx={'20px'} cursor={'pointer'}>
			<Tooltip label={type} background={'teal.500'} hasArrow placement='top'>
				<Image src={chooseType(type)} />
			</Tooltip>
		</Box>
	)
}

export default PokemonType
