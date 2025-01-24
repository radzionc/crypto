# @product/utxo

A TypeScript implementation of Bitcoin's UTXO (Unspent Transaction Output) model. This package provides utilities for managing Bitcoin UTXOs, including balance calculation, UTXO selection, and transaction input management.

## Features

- **UTXO Management**: Filter and manage confirmed/unconfirmed UTXOs
- **Balance Calculation**: Calculate total balance from available UTXOs
- **UTXO Selection**: Smart selection of UTXOs for transactions using multiple strategies:
  - Exact match finding
  - Single UTXO selection
  - Accumulative selection with optimal input count
- **Bitcoin-Compatible**: Implementation works with Blockstream API for real Bitcoin data
- **Testing Tools**: Includes comprehensive testing utilities with real blockchain data

## Tech Stack

- **TypeScript** within a monorepo structure
- **Blockstream API** for fetching real UTXO data
- **@lib/chain** utilities for Bitcoin-specific operations

## Getting Started

1. **Install dependencies**:
   ```bash
   yarn
   ```

2. **Run tests**:
   ```bash
   yarn test
   ```

3. **Type check**:
   ```bash
   yarn typecheck
   ```

## Usage Example

```typescript
import { getConfirmedUtxos } from './core/utxo'
import { getBalance } from './core/getBalance'
import { selectUtxos } from './core/selectUtxos'

// Get and filter confirmed UTXOs
const utxos = await fetchUtxos(address)
const confirmedUtxos = getConfirmedUtxos(utxos)

// Calculate total balance
const balance = getBalance(confirmedUtxos)

// Select UTXOs for a transaction
const targetAmount = 1000000n // amount in satoshis
const selectedUtxos = selectUtxos(confirmedUtxos, targetAmount)
```

## Core Functions

- `getConfirmedUtxos`: Filters confirmed UTXOs from a list of UTXOs
- `getBalance`: Calculates total balance from a list of UTXOs
- `selectUtxos`: Selects optimal UTXOs for a target transaction amount
