# @product/price-watcher

A core package for managing cryptocurrency price alerts and notifications.

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
yarn run
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


