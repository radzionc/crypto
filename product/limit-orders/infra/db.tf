resource "aws_dynamodb_table" "orders" {
  name         = var.limit_orders_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
