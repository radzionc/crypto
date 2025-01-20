# @product/merkle-tree

A TypeScript implementation of Merkle trees with a focus on Bitcoin block verification. This package provides utilities for creating Merkle trees, generating proofs, and verifying transaction inclusion in Bitcoin blocks.

## Features

- **Merkle Root Calculation**: Generate Merkle roots from a list of transaction hashes
- **Merkle Proof Generation**: Create inclusion proofs for specific transactions
- **Proof Verification**: Verify transaction inclusion using Merkle proofs
- **Bitcoin Block Verification**: Validate transaction inclusion in Bitcoin blocks using the Blockstream API
- **Generic Implementation**: Core functions are chain-agnostic and can be used with custom hashing algorithms

## Tech Stack

- **TypeScript** within a monorepo structure
- **Node.js** crypto module for SHA-256 hashing
- **Blockstream API** for Bitcoin block data

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
import { getMerkleRoot } from './core/getMerkleRoot'
import { getMerkleProof } from './core/getMerkleProof'
import { verifyMerkleProof } from './core/verifyMerkleProof'
import { toBitcoinMerkleNode } from './core/toBitcoinMerkleNode'

// Calculate Merkle root
const transactions = ['tx1', 'tx2', 'tx3', 'tx4']
const root = getMerkleRoot(transactions, toBitcoinMerkleNode)

// Generate proof for tx2
const proof = getMerkleProof({
  nodes: transactions,
  targetNode: 'tx2',
  toNode: toBitcoinMerkleNode,
})

// Verify proof
const isValid = verifyMerkleProof({
  leaf: 'tx2',
  merkleRoot: root,
  proof,
  toNode: toBitcoinMerkleNode,
  index: 1,
})
```

## Core Functions

- `getMerkleRoot`: Calculates the Merkle root from a list of leaves
- `getMerkleProof`: Generates a Merkle proof for a specific leaf
- `verifyMerkleProof`: Verifies a Merkle proof against a root
- `toBitcoinMerkleNode`: Bitcoin-specific implementation of node hashing
