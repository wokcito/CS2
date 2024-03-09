import { z } from 'zod'
import {
	isNotEmptyString,
	isTimestamp,
	isValidPublicKey,
	isValidRoute
} from './zod-validators'
import { BASE_URL, DMAR_ED25519 } from './constants'
import { AvailableMethods } from './types'

export const schema = z.object({
	route: isValidRoute,
	method: z.nativeEnum(AvailableMethods),
	publicKey: isValidPublicKey,
	timestamp: isTimestamp,
	signature: isNotEmptyString
})

export type GenerateRequestSchema = z.infer<typeof schema>

/**
 * returns a Request object according to API's documentation
 * @see {@link https://docs.dmarket.com/v1/swagger.html}
 */
export function generateRequest (data: GenerateRequestSchema): Request {
	const result = schema.safeParse(data)
	if (!result.success) throw new Error()

	const { route, method, publicKey, timestamp, signature } = result.data

	const request = new Request(BASE_URL + route, { method })

	request.headers.append('x-api-key', publicKey)
	request.headers.append('x-sign-date', `${timestamp}`)
	request.headers.append('x-request-sign', `${DMAR_ED25519}${signature}`)
	request.headers.append('content-type', 'application/json')

	return request
}
