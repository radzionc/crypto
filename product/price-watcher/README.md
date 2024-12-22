# @product/price-watcher

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

## Run Locally

Ensure the following environment variables are configured:

```bash
# Required only when running on AWS Lambda
# export SENTRY_KEY=<Your_Sentry_Key>
export TELEGRAM_BOT_TOKEN=<Your_Telegram_Bot_Token>
export TELEGRAM_BOT_CHAT_ID=<Your_Telegram_Chat_ID>
export PRICE_ALERTS_TABLE_NAME=<DynamoDB_Table_Name>
```

Run the code locally:

```bash
yarn dev
```

## Deployment

To deploy this project to AWS Lambda, configure the environment variables:

```bash
export BUCKET=<Your_S3_Bucket_Name>
export BUCKET_KEY=lambda.zip
export FUNCTION_NAME=<Your_AWS_Lambda_Function_Name>
```

Deploy the function:

```bash
. ./deploy.sh
```

This will upload the packaged Lambda to the specified S3 bucket and deploy it to AWS Lambda with the given function name.


