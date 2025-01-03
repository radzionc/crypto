# Crypto & Blockchain Tools Monorepo

Welcome! This monorepo contains multiple TypeScript projects that streamline crypto trading, price monitoring, and trading history analysis:

- [**@product/limit-orders**](./product/limit-orders/README.md)  
  Automates limit orders on EVM chains (e.g., wETH <-> USDC on Polygon) using the 0x v2 API when conditions are met.

- [**@product/price-watcher**](./product/price-watcher/README.md)  
  Monitors crypto prices and sends Telegram notifications if thresholds are crossed, deployed via AWS Lambda + Terraform.
  
- [**@product/trader**](./product/trader/README.md)  
  Automates a Moving Average Crossover Strategy for trading wETH and USDC on Polygon using the 0x v2 API. Deployed as an AWS Lambda with Terraform, with secure data management via AWS Secrets Manager.

- [**@product/trading-history**](./product/trading-history/README.md)  
  A Next.js single-page application tracking trading history for ETH and WETH on both Ethereum and Polygon.