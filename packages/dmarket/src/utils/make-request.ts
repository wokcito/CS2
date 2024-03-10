import { z } from 'zod'
import {
	isNotEmptyString,
	isValidMethod,
	isValidPrivateKey,
	isValidPublicKey,
	isValidRoute
} from './zod-validators'
import {
	generateRequest,
	generateSignature
} from './index'

const schema = z.object({
	privateKey: isValidPrivateKey,
	publicKey: isValidPublicKey,
	route: isValidRoute,
	method: isValidMethod,
	body: isNotEmptyString.optional()
})

export type MakeRequestSchema = z.infer<typeof schema>

/**
 * handles the call to the DMarket's API
 */
export async function makeRequest <T = unknown> (data: MakeRequestSchema): Promise<T> {
	const result = schema.safeParse(data)
	if (!result.success) throw new Error()

	const { privateKey, publicKey, route, method, body } = result.data

	const timestamp = getTimestamp()
	const signature = generateSignature({
		privateKey,
		string: method + route + `${body ?? ''}` + timestamp
	})
	const request = generateRequest({
		route,
		method,
		publicKey,
		timestamp,
		signature
	})

	const response = await fetch(request)

	if (response.status >= 400) {
		throw new Error()
	}

	return await response.json() as T
}

/**
 * return the first ten numbers from the current timestamp
 *
 * it makes easier test the utility 'makeRequest'
 */
export function getTimestamp (): number {
	return Math.floor(Date.now() / 1000)
}
