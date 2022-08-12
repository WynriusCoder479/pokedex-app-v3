import { FieldError, IResponse } from '../../types/Response'

export interface UserMutationResponse extends IResponse {
	errors?: [FieldError]
}
