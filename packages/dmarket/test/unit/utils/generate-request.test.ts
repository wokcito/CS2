import {
	generateRequest,
	AvailableMethods,
	type GenerateRequestSchema
} from '@utils/index'
import { BASE_URL, DMAR_ED25519 } from '@utils/constants'

describe('generateRequest', () => {
	const XApiKey = 'x-api-key'
	const XSignDate = 'x-sign-date'
	const XRequestSign = 'x-request-sign'
	const ContentType = 'content-type'

	const data: GenerateRequestSchema = {
		route: '/route',
		method: AvailableMethods.GET,
		publicKey: '8397eb8e7f88032eb13dca99a11350b05d290c896a96afd60b119184b1b443c9',
		timestamp: 1000000000,
		signature: 'signature'
	}

	it.each([
		[''],
		[undefined]
	])('should verify if \'route\' was sent', (route) => {
		expect(() => generateRequest({ ...data, route: route as unknown as string })).toThrow()
	})

	it('should validate if \'route\' starts with \'/\'', () => {
		expect(() => generateRequest({ ...data, route: 'route' })).toThrow()
	})

	it('should return a request with the BASE_URL + \'route\'', () => {
		const route = '/route'
		const request = generateRequest({ ...data, route })

		expect(request.url).toBe(`${BASE_URL}${route}`)
	})

	it.each([
		[''],
		[undefined]
	])('should verify if \'method\' was sent', (method) => {
		expect(() => generateRequest({ ...data, method: method as AvailableMethods })).toThrow()
	})

	it.each([
		[AvailableMethods.GET],
		[AvailableMethods.POST],
		[AvailableMethods.DELETE],
		[AvailableMethods.PATCH]
	])('should return a request with the method sent', (method) => {
		const request = generateRequest({ ...data, method })
		expect(request.method).toBe(method)
	})

	it.each([
		[''],
		[undefined]
	])('should verify if \'publicKey\' was sent', (publicKey) => {
		expect(() => generateRequest({ ...data, publicKey: publicKey as unknown as string })).toThrow()
	})

	it('should verify if \'publicKey\' has 64 characters', () => {
		expect(() => generateRequest({ ...data, publicKey: data.publicKey.substring(1) })).toThrow()
	})

	it('should verify if \'publicKey\' is a hexadecimal string', () => {
		expect(() => generateRequest({ ...data, publicKey: 'x' + data.publicKey.substring(1) })).toThrow()
	})

	it(`should set 'publicKey' in the header '${XApiKey}'`, () => {
		const { headers } = generateRequest(data)
		const header = headers.get(XApiKey)

		expect(header).toBe(data.publicKey)
	})

	it.each([
		[''],
		[undefined]
	])('should verify if \'timestamp\' was sent', (timestamp) => {
		expect(() => generateRequest({ ...data, timestamp: timestamp as unknown as number })).toThrow()
	})

	it.each([
		[123456789],
		[1234567891000],
		[123]
	])('should verify if \'timestamp\' has 10 characters', (timestamp) => {
		expect(() => generateRequest({ ...data, timestamp })).toThrow()
	})

	it(`should set 'timestamp' in the header '${XSignDate}'`, () => {
		const timestamp = Math.floor(Date.now() / 1000)
		const { headers } = generateRequest({ ...data, timestamp })
		const header = headers.get(XSignDate)

		expect(header).toBe(`${timestamp}`)
	})

	it.each([
		[''],
		[undefined]
	])('should verify if \'signature\' was sent', (signature) => {
		expect(() => generateRequest({ ...data, signature: signature as unknown as string })).toThrow()
	})

	it(`should set 'signature' in the header '${XRequestSign}' but starting with ${DMAR_ED25519}`, () => {
		const { headers } = generateRequest(data)
		const header = headers.get(XRequestSign)

		expect(header).toBe(`${DMAR_ED25519}${data.signature}`)
	})

	it(`should set the header ${ContentType} with the value 'application/json'`, () => {
		const { headers } = generateRequest(data)
		const header = headers.get(ContentType)

		expect(header).toBe('application/json')
	})
})
