# @product/proof-of-work

A TypeScript implementation of Bitcoin's Proof of Work (PoW) consensus mechanism. This package provides utilities for block hash calculation, mining simulation, and difficulty verification, compatible with the Bitcoin protocol.

## Features

- **Block Hash Calculation**: Generate Bitcoin-compatible block hashes
- **Mining Simulation**: Simulate the Bitcoin mining process with configurable parameters
- **Difficulty Verification**: Verify that block hashes meet the required difficulty target
- **Bitcoin-Compatible**: Implementation matches Bitcoin's block header structure and mining rules
- **Testing Tools**: Includes tools for verifying against real Bitcoin blocks

## Tech Stack

- **TypeScript** within a monorepo structure
- **Node.js** crypto module for SHA-256 hashing
- **Blockstream API** integration for real block verification

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
import { getBlockHash } from './core/getBlockHash'
import { mineBlock } from './core/mineBlock'
import { checkDifficulty } from './core/checkDifficulty'

// Verify an existing block hash
const blockHeader = {
  version: 1,
  previousBlockHash: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
  merkleRoot: '8e38c9c5b9b1c8cd3cc5378cc9fe771f21b7b6a50c56dc1126a3ab0c2c14be0c',
  timestamp: 1611234567,
  bits: 0x1d00ffff,
  nonce: 2083236893
}

const hash = getBlockHash(blockHeader)

// Mine a new block
const miningResult = mineBlock({
  ...blockHeader,
  startNonce: 0
})

// Verify difficulty
const meetsTarget = checkDifficulty(miningResult.hash, blockHeader.bits)
```

## Core Functions

- `getBlockHash`: Calculates a Bitcoin-compatible block hash from header fields
- `mineBlock`: Performs proof-of-work mining to find a valid nonce
- `checkDifficulty`: Verifies if a hash meets the difficulty target specified by bits
