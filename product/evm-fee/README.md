# @product/evm-fee

A real-time Ethereum gas fee calculator and monitoring dashboard that helps users estimate transaction costs. Available at [fee.radzion.com](https://fee.radzion.com).

## Features

- Real-time estimation of total transaction costs in ETH and USD
- Gas fee components breakdown:
  - Base fee monitoring with historical data
  - Priority fee analysis with slow/medium/fast options
  - Maximum fee calculation
- Interactive fee history charts
- Sample transaction cost estimation (1 ETH transfer)

## Tech Stack

- **Frontend**: Next.js
- **Web3**: wagmi + viem
- **Data Fetching**: TanStack Query

## Development

1. Install dependencies:
```bash
yarn install
```

2. Start development server:
```bash
yarn dev
```

## Infrastructure

The application is hosted on AWS using S3 and CloudFront. See the [infrastructure documentation](./infra/README.md) for deployment details.

## License

Private - All Rights Reserved
