import { type Context } from '../utils'
import { type UserResponse } from './types'
import { type AxiosResponse } from 'axios'

const route = '/account/v1/user'

export function user ({ httpClient }: Context): () => Promise<AxiosResponse<UserResponse>> {
	return async function request (): Promise<AxiosResponse<UserResponse>> {
		return await httpClient.get<UserResponse>(route)
	}
}
