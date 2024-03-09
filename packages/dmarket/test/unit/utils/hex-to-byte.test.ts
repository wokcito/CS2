import { hexStringToByte } from '@utils/index'

describe('hexStringToByte', () => {
	const string = '160def14cc17a582b093c2e958bc5e0f'
	const result = [22, 13, 239, 20, 204, 23, 165, 130, 176, 147, 194, 233, 88, 188, 94, 15]

	it.each([
		[''],
		[undefined]
	])('should verify if the string was sent', (string) => {
		expect(() => hexStringToByte(string as unknown as string)).toThrow()
	})

	it.each([
		['not-a-hexadecimal-string'],
		[string + 'x']
	])('should verify if the string is a hexadecimal string', (string) => {
		expect(() => hexStringToByte(string)).toThrow()
	})

	it('should transform correctly a hexadecimal string to a uInt8Array', () => {
		expect(hexStringToByte(string)).toStrictEqual(new Uint8Array(result))
	})
})
