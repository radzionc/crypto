# @product/price-watcher

A core package for managing cryptocurrency price alerts and notifications.

## Run Locally

Ensure the following environment variables are configured:

```bash
# Required only when running on AWS Lambda
# export SENTRY_KEY=<Your_Sentry_Key>
export ACCOUNT_ADDRESS=<Your_Account_Address>
export LIMIT_ORDERS_TABLE_NAME=crypto_limit_orders
export SECRETS=<Your_Secrets_Manager_Secret_Name>
```

The service also requires secrets to be stored in AWS Secrets Manager. The following secrets are required:

```json
{
  "accountPrivateKey": "<Your_Account_Private_Key>",
  "zeroXApiKey": "<Your_0x_Api_Key>",
  "telegramBotToken": "<Your_Telegram_Bot_Token>",
}
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

