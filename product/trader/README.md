# @product/limit-orders

This package provides a service to run limit orders on an EVM chain, focusing on swaps between wETH and USDC on the Polygon network. It allows specifying a price condition based on an asset’s target price (using either a `less` or `more` comparison), and automatically executes the swap via the 0x v2 API when the condition is met.

## Requirements

- **Environment Variables**:  
  - Refer to the `getEnvVars.ts` file for a list of required environment variables.
- **AWS Secrets Manager**:  
  - Sensitive data (e.g., API keys, private keys) must be stored in AWS Secrets Manager.
  - The secret key names and usage are outlined in the `getSecret.ts` file.

## Deployment

1. **Configure Environment**:  
   - Make sure the environment variables specified in `deploy.sh` are set properly.
   - Ensure AWS credentials are configured for your deployment environment.
2. **Run the Deployment Script**:  
   ```bash
   ./deploy.sh
   ```
   - This script will deploy the service using Terraform or other configured tools.
