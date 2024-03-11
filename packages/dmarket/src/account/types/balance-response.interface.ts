/**
 * DMarket's balance interface
 *
 * @see {@link https://docs.dmarket.com/v1/swagger.html#/Account/getUserBalance}
 */
export interface BalanceResponse {
	dmc: string
	dmcAvailableToWithdraw: string
	usd: string
	usdAvailableToWithdraw: string
}
