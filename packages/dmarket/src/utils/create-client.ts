import { z } from 'zod'
import * as modules from '../modules'

import { createContext } from './create-context'
import { isValidPrivateKey, isValidPublicKey } from './zod-validators'

const dmarketConfigSchema = z.object({
	privateKey: isValidPrivateKey,
	publicKey: isValidPublicKey
})

export type DMarketConfig = z.infer<typeof dmarketConfigSchema>

/**
 * Creates a DMarket's API client
 * @param {Object} config
 * @param {string} config.privateKey - A DMarket's private key
 * @param {string} config.publicKey - A DMarket's public key
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createDMarketClient (config: DMarketConfig) {
	const result = dmarketConfigSchema.safeParse(config)
	if (!result.success) throw new Error()

	const context = createContext(result.data)

	const account = Object.freeze({
		/**
		 * Getting the current USD & DMC balance that is available for trading items / buying subscriptions.
		 *
		 * The response format is in coins (cents for USD, dimoshi for DMC).
		 *
		 * @see {@link https://docs.dmarket.com/v1/swagger.html#/Account/getUserBalance}
		 */
		balance: modules.account.balance(context),
		/**
		 * Getting general user profile information
		 *
		 * @see {@link https://docs.dmarket.com/v1/swagger.html#/Account/getUserByTokenHandler}
		 */
		user: modules.account.user(context)
	})

	return {
		account
	}
}
