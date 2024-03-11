# @cs2/dmarket

## 0.2.2

### Patch Changes

- 09a355a: Sort methods in ascending order

## 0.2.1

### Patch Changes

- 3b053a2: Remove `removeComments` from tsconfig.json

  Now JSDoc comments are available

## 0.2.0

### Minor Changes

- 49da39a: Add support to '/account/v1' routes

  The following methods are now available

  - `.account.user()`
  - `.account.balance()`

- 49da39a: Add 'createContext' utility
- 49da39a: Add 'createDMarketClient' utility

### Patch Changes

- 49da39a: Delete 'generateRequest' utility
- 49da39a: Delete 'makeRequest' utility

## 0.1.1

### Patch Changes

- 263ab99: Fix error that caused `Unauthorized` responses if the body was `undefined`

## 0.1.0

### Minor Changes

- 10950fd: Add 'makeRequest' utility and its test file
- 10950fd: Add 'generateSignature' utility and its test file
- 10950fd: Add 'hexStringToByte' utility and its test file
- 10950fd: Add 'generateRequest' utility and its test file
- 10950fd: Add 'byteToHexString' utility and its test file
