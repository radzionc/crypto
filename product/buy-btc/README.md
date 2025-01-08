# @product/buy-btc

A decentralized application for buying Bitcoin (BTC) using ETH, BNB, or AVAX via THORChain. The app provides a simple and secure way to swap native cryptocurrencies from different chains for Bitcoin.

## Features

- Support for multiple source chains:
  - Ethereum (ETH)
  - Binance Smart Chain (BNB)
  - Avalanche (AVAX)
- Real-time price quotes from THORChain
- Secure wallet integration
- Modern, responsive UI
- PWA support

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Styled Components
- **Web3**: wagmi, viem
- **State Management**: React Query
- **Deployment**: AWS (CloudFront + S3)

## Development

### Prerequisites

- Node.js
- Yarn
- AWS CLI (for deployment)

### Setup

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables:
- Generate REOWN_PROJECT_ID from https://cloud.reown.com/
- Set up required AWS credentials for deployment

3. Start development server:
```bash
yarn dev
```

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build production bundle
- `yarn start` - Start production server
- `yarn lint` - Run linter
- `yarn typecheck` - Run TypeScript type checking
- `yarn generate-icons` - Generate app icons

## Deployment

The application is deployed to AWS using CloudFront and S3. The deployment process is automated via the `deploy.sh` script.

Required environment variables for deployment:
- `BUCKET`: S3 bucket name
- `DISTRIBUTION_ID`: CloudFront distribution ID

To deploy:
```bash
./deploy.sh
```

## Live Demo

The application is available at https://btc.radzion.com

## Infrastructure

The project uses Terraform for infrastructure management. The infrastructure code is located in the `infra` directory and includes:
- S3 bucket configuration
- CloudFront distribution setup
- Required IAM policies and permissions