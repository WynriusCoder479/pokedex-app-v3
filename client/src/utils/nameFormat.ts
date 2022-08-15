export const nameFormat = (move: string) => {
	const moveArr = move.replace('-', ' ').split(' ')

	return moveArr
		.map(element => element.charAt(0).toUpperCase() + element.slice(1))
		.join(' ')
}
