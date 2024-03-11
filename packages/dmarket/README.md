# @cs2/dmarket

Wrapper library for [DMarket's API](https://docs.dmarket.com/v1/swagger.html)

![NPM Version](https://img.shields.io/npm/v/%40cs2%2Fdmarket)
![NPM Downloads](https://img.shields.io/npm/dm/%40cs2%2Fdmarket)
[![install size](https://packagephobia.com/badge?p=@cs2/dmarket)](https://packagephobia.com/result?p=@cs2/dmarket)

## Installation

```sh
npm install @cs2/dmarket
# or
pnpm add @cs2/dmarket
```

## Usage

```ts
import { createDMarketClient } from '@cs2/dmarket'

const client = createDMarketClient({
	privateKey: 'your private key',
	publicKey: 'your public key'
})

const { data } = await client.account.balance()
```
