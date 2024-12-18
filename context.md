You will assist me with tasks related to this project. Please read the details below and reply with "Yes" if you understand the project.

This is a self-hosted tool for receiving notifications when a cryptocurrency exceeds or falls below a specified price.

## Tech Stack

The project is a TypeScript monorepo. We use DynamoDB to store alerts. An AWS Lambda function is triggered every 10 minutes to check the prices of cryptocurrencies included in the alerts. If a price exceeds or falls below the specified threshold, the system sends a notification to the user via Telegram. The project is deployed to AWS using Terraform.

The Lambda code is located in the `@product/price-watcher` package. For more information, please refer to the `README.md` file in that package.