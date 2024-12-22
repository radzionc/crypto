You will assist me with tasks related to this project. Please read the details below and reply with "Yes" if you understand the project.

This is a service to run a limit order on a EVM chain. A limit order has a swap with from and to assets. And a condition for where the swap should be executed, the condtion includes an asset, target price and 'less' or 'more' condition.

For simplicity sake, we have only two assets - wETH and USDC on Polygon chain. To execute a swap, we use 0x v2 API.

## Tech Stack

This project is a part of a TypeScript monerepo related to blochain projects.

We deploy the service as AWS Lambda via Terraform. Sensitive data is stored in AWS Secrets Manager.