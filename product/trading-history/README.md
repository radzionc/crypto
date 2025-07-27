# @product/trading-history

This application tracks trading history for ETH, WETH, wBTC, and cbBTC on Ethereum, Polygon, and Base networks. It utilizes the Alchemy API to fetch and display recent trades, helping users decide if it's a good time to buy or sell.

**Deployed at**: [https://history.radzion.com](https://history.radzion.com)

## Features
- **Set API Key**: Use a valid Alchemy API key to enable the trading history feature.
- **Asset Selection**: Switch between ETH (ETH & WETH) and BTC (wBTC & cbBTC) views using the tab navigation.
- **Trading History**: Monitor and combine trades from multiple addresses, giving a comprehensive overview of recent activity.
- **Buy or Sell Indicator**: Based on the last trade and current asset price (ETH or BTC), the app offers a quick suggestion on potential buy or sell timing.
- **Cross-Chain Support**: Track trades across Ethereum, Polygon, and Base networks.

## Supported Assets
- **ETH Assets**: ETH (native Ethereum) and WETH (Wrapped Ethereum)
- **BTC Assets**: wBTC (Wrapped Bitcoin) and cbBTC (Coinbase Wrapped Bitcoin)
- **Pricing**: Uses real BTC price for all BTC-related tokens to provide accurate market insights

## Tech Stack
- **TypeScript** within a monorepo structure
- **Next.js** for a single-page application
- **Alchemy API** for fetching trade data
- **AWS (CloudFront + S3)** for deployment

## Getting Started
1. **Clone** the repository and install dependencies:
   ```bash
   yarn
   ```
2. **Start** the development server:
   ```bash
   npm dev
   ```
3. **Open** your browser and visit `http://localhost:3000`.

Enjoy tracking your crypto trades across ETH and BTC assets!