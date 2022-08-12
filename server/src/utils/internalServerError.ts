export const internalServerError = (error: any) => {
	console.log(error)
	return {
		code: 500,
		success: false,
		message: `Internal server error ${error.message}`
	}
}
