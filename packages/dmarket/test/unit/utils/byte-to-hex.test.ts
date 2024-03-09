import { byteToHexString } from '@utils/index'

describe('hexStringToByte', () => {
	const uInt8Array = [22, 13, 239, 20, 204, 23, 165, 130, 176, 147, 194, 233, 88, 188, 94, 15]
	const result = '160def14cc17a582b093c2e958bc5e0f'

	it.each([
		[[]],
		[result]
	])('should verify if the uInt8Array was sent and is a valid uInt8Array', (uInt8Array) => {
		expect(() => byteToHexString(uInt8Array as unknown as Uint8Array)).toThrow()
	})

	it('should transform correctly a uInt8Array to a hexadecimal string', () => {
		expect(byteToHexString(new Uint8Array(uInt8Array))).toStrictEqual(result)
	})
})
