import { isHexString } from './zod-validators'

/**
 * transforms a hexadecimal string to byte array
 * @param {string} string
 *
 * copied from DMarket examples
 * @see {@link https://github.com/dmarket/dm-trading-tools/blob/master/signature-builder/js/targetCreator.js}
 */
export function hexStringToByte (string: string): Uint8Array {
	const result = isHexString.safeParse(string)
	if (!result.success) throw new Error()

	const twoNum = 2
	const radix = 16
	const uInt8arr = new Uint8Array(string.length / twoNum)
	for (let i = 0, j = 0; i < string.length; i += twoNum, j++) {
		uInt8arr[j] = parseInt(string.substring(i, i + twoNum), radix)
	}

	return uInt8arr
}
