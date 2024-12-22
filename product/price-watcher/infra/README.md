## AWS Lambda Hosting

Your environment variables should have the following values:

```sh
export AWS_SECRET_ACCESS_KEY=
export AWS_ACCESS_KEY_ID=
export AWS_REGION=

export TF_VAR_name=

export TF_VAR_telegram_bot_token=
export TF_VAR_price_alerts_table_name=
export TF_VAR_telegram_bot_chat_id=
export TF_VAR_sentry_key=

export TF_VAR_remote_state_bucket=
export TF_VAR_remote_state_key=
export TF_VAR_remote_state_region=
```

To setup infrastructure run

```sh
terraform init \
  -backend-config="bucket=${TF_VAR_remote_state_bucket}" \
  -backend-config="key=${TF_VAR_remote_state_key}" \
  -backend-config="region=${TF_VAR_remote_state_region}"

terraform apply
```