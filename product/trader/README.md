# @product/trader

This project automates a Moving Average Crossover Strategy for trading wETH and USDC on Polygon using the 0x v2 API. Built with TypeScript and deployed as an AWS Lambda via Terraform, it ensures security with sensitive data managed in AWS Secrets Manager.

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
