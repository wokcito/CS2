import { z } from 'zod'

const regExpHexadecimal = /^[a-f0-9]+$/

export const isString = z
	.string()
	.trim()

export const isNotEmptyString = isString
	.min(1)

/**
 * Validates if a string is hexadecimal
 */
export const isHexString = isNotEmptyString
	.toLowerCase()
	.refine(value => value.match(regExpHexadecimal) !== null)

/**
 * Validates if a string is a valid DMarket's private key
 */
export const isValidPrivateKey = isNotEmptyString
	.toLowerCase()
	.length(128)
	.refine(value => value.match(regExpHexadecimal) !== null)

export const isUint8Array = z
	.instanceof(Uint8Array)
