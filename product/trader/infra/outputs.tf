output "bucket" {
  value = aws_s3_bucket.lambda_storage.bucket
}

output "bucket_key" {
  value = aws_s3_object.zipped_lambda.key
}

output "function_name" {
  value = aws_lambda_function.lambda.function_name
}

output "traders_table_name" {
  value = aws_dynamodb_table.traders.name
}

output "secrets" {
  value = aws_secretsmanager_secret.secrets.name
}