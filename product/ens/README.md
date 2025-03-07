# ENS Name Registration App

A streamlined web application for registering Ethereum Name Service (ENS) domains. This app provides a simple, user-friendly interface for purchasing ENS names with a straightforward two-step process.

## Features

- Simple two-step registration process
- Real-time name availability checking
- Customizable registration duration (in years)
- Wallet integration for transaction signing
- Progress tracking during the registration process

## How It Works

1. **Name Selection Step**
   - Enter your desired ENS name
   - Choose registration duration
   - Check name availability
   - Connect your wallet

2. **Registration Step**
   - View registration progress
   - Sign required transactions
   - Complete the registration process

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Blockchain Integration**:
  - Wagmi v2
  - Viem
  - RainbowKit v2
- **Styling**: Styled Components
- **State Management**: React Query (TanStack Query)

## Development

```bash
# Install dependencies
yarn

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Deployment

The application is deployed at [ens.radzion.com](https://ens.radzion.com)

## Project Structure

- `/register` - Core registration functionality and components
- `/chain` - Blockchain interaction logic
- `/state` - Application state management
- `/ui` - Reusable UI components
- `/pages` - Next.js pages and routing

## License

This is a public repository. Please check the repository's license file for detailed information.
