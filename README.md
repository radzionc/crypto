# Crypto & Blockchain Tools Monorepo

Welcome! This monorepo contains multiple TypeScript projects that streamline crypto trading, price monitoring, and trading history analysis:

- [**@product/buy-btc**](./product/buy-btc/README.md)  
  A decentralized application for buying Bitcoin (BTC) using ETH, BNB, or AVAX via THORChain, with real-time price quotes and secure wallet integration.

- [**@product/limit-orders**](./product/limit-orders/README.md)  
  Automates limit orders on EVM chains (e.g., wETH <-> USDC on Polygon) using the 0x v2 API when conditions are met.

- [**@product/price-watcher**](./product/price-watcher/README.md)  
  Monitors crypto prices and sends Telegram notifications if thresholds are crossed, deployed via AWS Lambda + Terraform.
  
- [**@product/trader**](./product/trader/README.md)  
  Automates a Moving Average Crossover Strategy for trading wETH and USDC on Polygon using the 0x v2 API. Deployed as an AWS Lambda with Terraform, with secure data management via AWS Secrets Manager.

- [**@product/trading-history**](./product/trading-history/README.md)  
  A Next.js single-page application tracking trading history for ETH and WETH on both Ethereum and Polygon.

- [**@product/merkle-tree**](./product/merkle-tree/README.md)  
  A TypeScript implementation of Merkle trees with a focus on Bitcoin block verification. This package provides utilities for creating Merkle trees, generating proofs, and verifying transaction inclusion in Bitcoin blocks.

- [**@product/proof-of-work**](./product/proof-of-work/README.md)  
  A TypeScript implementation of Bitcoin's Proof of Work (PoW) consensus mechanism, providing utilities for block hash calculation, mining simulation, and difficulty verification compatible with the Bitcoin protocol.

- [**@product/utxo**](./product/utxo/README.md)  
  A TypeScript implementation of Bitcoin's UTXO (Unspent Transaction Output) model, providing utilities for managing Bitcoin UTXOs, including balance calculation, UTXO selection, and transaction input management.
