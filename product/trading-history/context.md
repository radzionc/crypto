You will assist me with tasks related to this project. Please read the details below and reply with "Yes" if you understand the project.

This an application for tracking trading history. For simplicity sake, it supports only ETH and WETH trades on Ethereum and Polygon chains.

To get the trading history, we use Alchemy API.

The app has two views:

- **Set API Key**: To use the app, the user must set an API key. The API key is stored in local storage.
- **Trading History**: The user can add multiple addresses to track their trading history. The app shows the combined trading history of all the addresses.

Based on the last trade and the current price of ETH, the app tells the user if it's a good time to buy or sell.

The app is available at https://history.radzion.com

## Tech Stack

This project is a part of a TypeScript monerepo related to blochain projects.

It's a single page application built with NextJS. It's deployed to AWS via CloudFront and S3.