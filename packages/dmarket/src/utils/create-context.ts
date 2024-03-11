import axios, { type AxiosInstance } from 'axios'
import { z } from 'zod'
import {
	generateSignature,
	isValidMethod,
	isValidRoute
} from '.'
import { BASE_URL, DMAR_ED25519 } from './constants'
import { type DMarketConfig } from './create-client'

export interface Context {
	httpClient: AxiosInstance
}

const interceptorSchema = z.object({
	method: isValidMethod,
	url: isValidRoute
})

/**
 * Creates the context for all requests
 */
export function createContext ({
	privateKey,
	publicKey
}: DMarketConfig): Context {
	const httpClient = axios.create({
		baseURL: BASE_URL,
		headers: {
			'x-api-key': publicKey,
			'content-type': 'application/json'
		}
	})

	httpClient.interceptors.request.use((config) => {
		const result = interceptorSchema.safeParse({
			method: config.method?.toUpperCase(),
			url: config.url
		})
		if (!result.success) throw new Error()

		const { method, url } = result.data

		const timestamp = Math.floor(Date.now() / 1000)
		const signature = generateSignature({
			privateKey,
			string: method + url + `${JSON.stringify(config.data) ?? ''}` + timestamp
		})

		const { headers } = config
		headers['x-sign-date'] = timestamp
		headers['x-request-sign'] = `${DMAR_ED25519}${signature}`

		return config
	})

	return { httpClient }
}
