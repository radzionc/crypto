provider "aws" {
}

terraform {
  backend "s3" {
  }
}

resource "aws_s3_bucket" "lambda_storage" {
  bucket = "tf-${var.name}-storage"
}

data "archive_file" "local_zipped_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/lambda"
  output_path = "${path.module}/lambda.zip"
}


resource "aws_s3_object" "zipped_lambda" {
  bucket = aws_s3_bucket.lambda_storage.bucket
  key    = "lambda.zip"
  source = data.archive_file.local_zipped_lambda.output_path
}

resource "aws_lambda_function" "lambda" {
  function_name = "tf-${var.name}"

  s3_bucket   = aws_s3_bucket.lambda_storage.bucket
  s3_key      = "lambda.zip"
  memory_size = "1024"

  handler = "lambda.handler"
  runtime = "nodejs22.x"
  timeout = "50"
  role    = aws_iam_role.lambda.arn

  environment {
    variables = {
      SENTRY_KEY = var.sentry_key
      TELEGRAM_BOT_CHAT_ID = var.telegram_bot_chat_id
      LIMIT_ORDERS_TABLE_NAME = aws_dynamodb_table.orders.name
      SECRETS = aws_secretsmanager_secret.secrets.name
    }
  }
}

resource "aws_cloudwatch_event_rule" "lambda" {
  name                = var.name
  schedule_expression = "rate(10 minutes)"
}

resource "aws_cloudwatch_event_target" "lambda" {
  rule      = aws_cloudwatch_event_rule.lambda.name
  target_id = var.name
  arn       = aws_lambda_function.lambda.arn
}

resource "aws_lambda_permission" "lambda_cloudwatch" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.lambda.arn
}