import { isUint8Array } from './zod-validators'

/**
 * transforms a byte array to hexadecimal string
 * @param {Uint8Array} uInt8Array
 *
 * function copied from DMarket examples
 * @see {@link https://github.com/dmarket/dm-trading-tools/blob/master/signature-builder/js/targetCreator.js}
 */
export function byteToHexString (uInt8Array: Uint8Array): string {
	const result = isUint8Array.safeParse(uInt8Array)
	if (!result.success) throw new Error()

	let hexStr = ''
	const radix = 16
	const magicNumber = 0xff
	for (let i = 0; i < uInt8Array.length; i++) {
		let hex = (uInt8Array[i] & magicNumber).toString(radix)
		hex = (hex.length === 1) ? '0' + hex : hex
		hexStr += hex
	}

	return hexStr
}
