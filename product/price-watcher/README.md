# @product/price-watcher

## Environment Variables

```bash
export SENTRY_KEY=
export TELEGRAM_BOT_TOKEN=
export TELEGRAM_BOT_CHAT_ID=
export PRICE_ALERTS_TABLE_NAME=
```

## Deployment

To deploy this project to AWS Lambda set up the following environment variables:

```bash
export BUCKET=your-bucket-name
export BUCKET_KEY=lambda.zip
export FUNCTION_NAME=your-function-name
```

Then run the following commands:

```bash
. ./deploy.sh
```
