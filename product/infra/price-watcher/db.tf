resource "aws_dynamodb_table" "rules" {
  name         = var.price_alerts_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
