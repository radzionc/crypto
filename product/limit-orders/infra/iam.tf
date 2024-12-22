resource "aws_iam_role" "lambda" {
  name        = "tf-${var.name}"
  description = "IAM Role for Lambda function ${var.name}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_policy" "lambda" {
  name        = "tf-${var.name}"
  description = "Policy for Lambda function ${var.name} to write logs"
  path        = "/"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "AllowLambdaLogging",
        Effect = "Allow",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.lambda.arn
}

resource "aws_iam_policy" "dynamodb_full_access" {
  name        = "tf-${var.name}-dynamodb-full-access"
  description = "Full access for Lambda function ${var.name} to DynamoDB table ${var.limit_orders_table_name}"
  path        = "/"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "AllowFullAccessToDynamoDBTable",
        Effect = "Allow",
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:BatchWriteItem",
          "dynamodb:BatchGetItem"
        ],
        Resource = [
          "arn:aws:dynamodb:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:table/crypto_price_alerts"
        ]
      }
    ]
  })
}

resource "aws_secretsmanager_secret" "secrets" {
  name = "tf-${var.name}-secrets"
}

resource "aws_iam_policy" "secrets" {
  name = "tf-${var.name}-secrets"
  path = "/"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "secretsmanager:GetSecretValue",
      "Resource": "${aws_secretsmanager_secret.secrets.arn}",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "secrets" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.secrets.arn
}