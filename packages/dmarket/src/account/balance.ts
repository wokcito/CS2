import { type Context } from '../utils'
import { type BalanceResponse } from './types'
import { type AxiosResponse } from 'axios'

const route = '/account/v1/balance'

export function balance ({ httpClient }: Context): () => Promise<AxiosResponse<BalanceResponse>> {
	return async function request (): Promise<AxiosResponse<BalanceResponse>> {
		return await httpClient.get<BalanceResponse>(route)
	}
}
