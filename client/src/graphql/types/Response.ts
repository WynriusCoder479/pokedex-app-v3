export interface IResponse {
	code: number
	success: boolean
	message?: string
}

export interface FieldError {
	field: string
	message?: string
}
