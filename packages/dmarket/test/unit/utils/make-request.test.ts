import { http, HttpResponse } from 'msw'
import { type SetupServer, setupServer } from 'msw/node'
import { type z } from 'zod'
import * as utils from '@utils/index'
import {
	type MakeRequestSchema,
	generateSignature,
	getTimestamp,
	makeRequest
} from '@utils/index'
import { BASE_URL } from '@utils/constants'
import { type isValidMethod } from '@utils/zod-validators'

type METHOD = z.infer<typeof isValidMethod>

describe('makeRequest', () => {
	let server: SetupServer
	const data: MakeRequestSchema = {
		privateKey: '2de2824ac1752d0ed3c66abc67bec2db553022aa718287a1e773e104303031208397eb8e7f88032eb13dca99a11350b05d290c896a96afd60b119184b1b443c9',
		publicKey: '8397eb8e7f88032eb13dca99a11350b05d290c896a96afd60b119184b1b443c9',
		route: '/route',
		method: 'GET',
		body: JSON.stringify(['body'])
	}

	beforeAll(() => {
		server = setupServer(
			http.get(`${BASE_URL}/route`, () => HttpResponse.json({ message: 'success' }, { status: 200 }))
		)

		server.listen()
	})

	afterAll(() => {
		server.close()
	})

	it.each([
		[''],
		[undefined]
	])('should verify if \'privateKey\' was sent', async (privateKey) => {
		await expect(makeRequest({ ...data, privateKey: privateKey as unknown as string })).rejects.toThrow()
	})

	it('should validate if \'privateKey\' has 128 characters', async () => {
		await expect(makeRequest({ ...data, privateKey: data.privateKey.substring(1) })).rejects.toThrow()
	})

	it('should validate if \'privateKey\' is a hexadecimal string', async () => {
		await expect(makeRequest({ ...data, privateKey: 'x' + data.privateKey.substring(1) })).rejects.toThrow()
	})

	it.each([
		[''],
		[undefined]
	])('should verify if \'publicKey\' was sent', async (publicKey) => {
		await expect(makeRequest({ ...data, publicKey: publicKey as unknown as string })).rejects.toThrow()
	})

	it('should validate if \'publicKey\' has 64 characters', async () => {
		await expect(makeRequest({ ...data, publicKey: data.publicKey.substring(1) })).rejects.toThrow()
	})

	it('should validate if \'publicKey\' is a hexadecimal string', async () => {
		await expect(makeRequest({ ...data, publicKey: 'x' + data.publicKey.substring(1) })).rejects.toThrow()
	})

	it.each([
		[''],
		[undefined]
	])('should verify if \'route\' was sent', async (route) => {
		await expect(makeRequest({ ...data, route: route as unknown as string })).rejects.toThrow()
	})

	it('should validate if \'route\' starts with \'/\'', async () => {
		await expect(makeRequest({ ...data, route: 'route' })).rejects.toThrow()
	})

	it.each([
		[''],
		[undefined]
	])('should verify if \'method\' was sent', async (method) => {
		await expect(makeRequest({ ...data, method: method as METHOD })).rejects.toThrow()
	})

	it.each([
		[''],
		[[]],
		[123]
	])('should validate if \'body\' is string', async (body) => {
		await expect(makeRequest({ ...data, body: body as unknown as string })).rejects.toThrow()
	})

	it('should replace \'body\' for an empty string if it is undefined', async () => {
		const { privateKey, method, route } = data
		const timestamp = getTimestamp()
		vi.spyOn(utils, 'getTimestamp').mockReturnValue(timestamp)
		const spy = vi.spyOn(utils, 'generateSignature')
		await makeRequest({ ...data, body: undefined })

		expect(spy).toHaveBeenCalledWith({
			privateKey,
			string: method + route + timestamp
		})
	})

	it('should sign the method, route, body and timestamp with the private key', async () => {
		const { privateKey, method, route, body } = data
		const timestamp = getTimestamp()
		vi.spyOn(utils, 'getTimestamp').mockReturnValue(timestamp)
		const spy = vi.spyOn(utils, 'generateSignature')
		await makeRequest(data)

		expect(spy).toHaveBeenCalledWith({
			privateKey,
			string: method + route + body + timestamp
		})
	})

	it('should generate the request', async () => {
		const { privateKey, publicKey, method, route, body } = data
		const timestamp = getTimestamp()
		vi.spyOn(utils, 'getTimestamp').mockReturnValue(timestamp)
		const signature = generateSignature({
			privateKey,
			string: method + route + body + timestamp
		})
		const spy = vi.spyOn(utils, 'generateRequest')
		await makeRequest(data)

		expect(spy).toHaveBeenCalledWith({
			route,
			method,
			publicKey,
			timestamp,
			signature
		})
	})
})
