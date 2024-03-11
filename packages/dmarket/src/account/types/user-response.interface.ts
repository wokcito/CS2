/**
 * DMarket's user interface
 *
 * @see {@link https://docs.dmarket.com/v1/swagger.html#/Account/getUserByTokenHandler}
 */
export interface UserResponse {
	agreementsInfo: UserAgreementsInfo
	countryCode: string
	countryCodeFromIP: string
	email: string
	features: UserFeature[]
	ga_client_id: string
	hasActiveSubscriptions: boolean
	hasHistoryEvents: boolean
	id: string
	imageUrl: string
	isEmailVerified: boolean
	isPasswordSet: boolean
	level: number
	linkedGames: UserLinkedGame[]
	migrated: boolean
	publicKey: string
	regType: string
	restrictions: UserRestrictions[]
	settings: UserSettings
	steamAccount: UserSteamAccount
	twitchAccount: UserTwitchAccount
	username: string

	ethereumAccount?: UserEthereumAccount
	instagramAccount?: UserAccount
	labels?: unknown
	sagaPublicKey?: string
	storefront?: UserStorefront
	tinNotRequired?: boolean
	twitterAccount?: UserAccount
}

export interface UserAgreementsInfo {
	isConfirmed: boolean
	updated: number
}

export interface UserFeature {
	enabled: boolean
	name: string
}

export interface UserLinkedGame {
	gameId: string
	gameUserId: string
	username: string
}

export interface UserRestrictions {
	expirationTime: number
	name: string
}

export interface UserSettings {
	enabledDeviceConfirmation: boolean
	isSubscribedToNewsletters: boolean
	targetsLimit: number
	tradingApiToken: string
}

export interface UserSteamAccount {
	apiKey: string
	apiKeyStatus: string
	icon: string
	isProfilePrivate: boolean
	level: number
	steamId: string
	tradeUrl: string
	username: string

	isValidTradeURL?: boolean
	tradingStatus?: string
}

export interface UserAccount {
	userId: string
	username: string
}

export interface UserTwitchAccount extends UserAccount {
	icon: string
}

export interface UserEthereumAccount {
	address: string
}

export interface UserStorefront {
	disabled: boolean
	alias: string
}
