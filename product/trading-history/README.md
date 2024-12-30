# @product/trading-history

This application tracks trading history for ETH and WETH on both Ethereum and Polygon networks. It utilizes the Alchemy API to fetch and display recent trades, helping users decide if it’s a good time to buy or sell.

**Deployed at**: [https://history.radzion.com](https://history.radzion.com)

## Features
- **Set API Key**: Use a valid Alchemy API key to enable the trading history feature.
- **Trading History**: Monitor and combine trades from multiple addresses, giving a comprehensive overview of recent activity.
- **Buy or Sell Indicator**: Based on the last trade and current ETH price, the app offers a quick suggestion on potential buy or sell timing.

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

Enjoy tracking your ETH and WETH trades!