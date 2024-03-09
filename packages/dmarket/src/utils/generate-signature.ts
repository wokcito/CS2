import { sign } from 'tweetnacl'
import { z } from 'zod'
import { hexStringToByte, byteToHexString } from '.'
import { isNotEmptyString, isValidPrivateKey } from './zod-validators'

const schema = z.object({
	privateKey: isValidPrivateKey,
	string: isNotEmptyString
})

/**
 * signs a string with DMarket's private key
 *
 * function copied from examples
 * @see {@link https://github.com/dmarket/dm-trading-tools/blob/master/signature-builder/js/targetCreator.js}
 */
export function generateSignature (data: z.infer<typeof schema>): string {
	const result = schema.safeParse(data)
	if (!result.success) throw new Error()

	const { privateKey, string } = result.data

	const signatureBytes: Uint8Array = sign(new TextEncoder().encode(string), hexStringToByte(privateKey))
	return byteToHexString(signatureBytes).substring(0, 128)
}
