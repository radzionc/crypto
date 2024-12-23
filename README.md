# Crypto & Blockchain Tools Monorepo

Welcome! This monorepo contains two TypeScript projects that streamline crypto trading and price monitoring:

- [**@product/limit-orders**](./product/limit-orders/README.md)  
  Automates limit orders on EVM chains (e.g., wETH <-> USDC on Polygon) using the 0x v2 API when conditions are met.

- [**@product/price-watcher**](./product/price-watcher/README.md)  
  Monitors crypto prices and sends Telegram notifications if thresholds are crossed, deployed via AWS Lambda + Terraform.
