# Cryptocurrency Price Alert Tool

A self-hosted tool for receiving notifications when a cryptocurrency exceeds or falls below a specified price.

## Features

- Set alerts for cryptocurrency prices.
- Get notified via Telegram when a price crosses the specified threshold.
- Efficient price checking every 10 minutes.

## Tech Stack

- **TypeScript Monorepo**: Modular project structure.
- **DynamoDB**: Stores user alerts.
- **AWS Lambda**: Executes periodic price checks.
- **Telegram**: Sends notifications.
- **Terraform**: Infrastructure as code.

## Packages

### `@product/price-watcher`

The core package for managing alerts, checking prices, and sending notifications. 

For detailed setup and deployment instructions, refer to the [`README.md` of the @product/price-watcher package](product/price-watcher/README.md).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

