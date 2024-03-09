import * as utils from '@utils/index'
import { isHexString } from '@utils/zod-validators'
const { generateSignature } = utils

describe('generateSignature', () => {
	const privateKey = '2de2824ac1752d0ed3c66abc67bec2db553022aa718287a1e773e104303031208397eb8e7f88032eb13dca99a11350b05d290c896a96afd60b119184b1b443c9'
	const string = 'string'

	it.each([
		[''],
		[undefined]
	])('should verify if \'privateKey\' was sent', (privateKey) => {
		expect(() => generateSignature({ privateKey: privateKey as unknown as string, string })).toThrow()
	})

	it('should verify if \'privateKey\' has 128 characters', () => {
		expect(() => generateSignature({ privateKey: privateKey.substring(1), string })).toThrow()
	})

	it('should verify if \'privateKey\' is a hexadecimal string', () => {
		expect(() => generateSignature({ privateKey: 'x' + privateKey.substring(1), string })).toThrow()
	})

	it('should verify if \'string\' was sent', () => {
		expect(() => generateSignature({ privateKey, string: '' })).toThrow()
	})

	it('should return a hexadecimal string', () => {
		const signature = generateSignature({ privateKey, string })
		const result = isHexString.safeParse(signature)

		expect(result.success).toBe(true)
	})

	it('should use \'hexStringToByte\' utility', () => {
		const spy = vi.spyOn(utils, 'hexStringToByte')
		generateSignature({ privateKey, string })

		expect(spy).toHaveBeenCalledWith(privateKey)
	})

	it('should use \'byteToHexString\' utility', () => {
		const spy = vi.spyOn(utils, 'byteToHexString')
		generateSignature({ privateKey, string })

		expect(spy).toHaveBeenCalledTimes(1)
	})
})
